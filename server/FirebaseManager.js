const admin = require("firebase-admin");
const { GeoFire } = require("geofire");
const { distanceBetween } = require("geofire");
var serviceAccount = require("./firebase_key/private.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://multiplayer-rock-paper-s-5dbe4.firebaseio.com"
});

const auth = admin.auth();
const database = admin.database();

const getUidFromToken = function (token, callback)
{
    auth.verifyIdToken(token)
        .then((decodedToken) => 
        {
            callback({ error: false, uid: decodedToken.uid, message: "" });
        })
        .catch((error) => 
        {
            callback({ error: true, uid: "", message: error });
        });
};

const checkUserExistsDatabase = function (uid, role, callback)
{
    database.ref("Users").child(role).child(uid).once('value', (snapshot) => 
    {
        if (snapshot.exists())
        {
            callback({ error: false, exists: true, message: "" });
        }
        else
        {
            callback({ error: false, exists: false, message: "" });
        }
    }, (error) =>
    {
        callback({ error: true, exists: false, message: error });
    });
};

const registerUserToDatabase = function (token, role, userDetails, callback)
{
    getUidFromToken(token, (result) =>
    {
        if (result.error)
        {
            callback({ error: true, message: result.message, success: false });
            return;
        }

        const uid = result.uid;
        checkUserExistsDatabase(uid, role, function (result)
        {
            if (result.error)
            {
                callback(result);
                return;
            }

            if (result.exists)
            {
                callback({ error: false, success: true, message: "user already exists" });
            }
            else
            {
                var ref = database.ref("Users").child(role).ref.child(uid);
                ref.set(userDetails).then((value) => 
                {
                    if (userDetails.location)
                    {
                        var geofire = new GeoFire(ref);
                        geofire.set("location", [userDetails.location.latitude, userDetails.location.longitude]).then((value) => 
                        {
                            callback({ error: false, success: "Success", message: "User added Successfully!" });
                        })
                            .catch((error) =>
                            {
                                callback({ error: true, success: true, message: error });
                            });
                    }
                },
                    (error) => 
                    {
                        callback({ error: true, success: true, message: error });
                    });
            }
        });
    });


};

const addMenuItem = function (token, itemDetails, callback)
{
    getUidFromToken(token, function (res)
    {
        if (res.error)
        {
            callback({ error: true, message: res.message, success: false });
            return;
        }
        const uid = res.uid;
        checkUserExistsDatabase(uid, "Drivers", function (result)
        {
            if (result.error)
            {
                callback(result);
                return;
            }

            if (!result.exists)
            {
                callback({ error: true, success: false, message: "User does not exist" });
                return;
            }
            database.ref("Users").child("Drivers").child(uid).child("menu").child(itemDetails.title).set(itemDetails)
                .then(value => 
                {
                    callback({ error: false, success: true, message: "Menu Item added successfully" })
                })
                .catch(error => 
                {
                    callback({ error: true, success: false, message: error, data: itemDetails.id });
                });
        });
    });
};

const deleteMenuIten = function (token, itemTitle, callback)
{
    getUidFromToken(token, (res) => 
    {
        if (res.error)
        {
            callback({ error: true, success: false, message: res.message });
            return;
        }

        database.ref("Users").child("Drivers").child(res.uid).child("menu").child(itemTitle).set(null)
            .then(value => 
            {
                callback({ error: false, success: true, message: res.message });
            })
            .catch(error => 
            {
                callback({ error: true, success: false, message: error });
            });
    });
};

const getShopDetails = function (location, shopUID, callback)
{

    //TODO: get the location and compare the distance and send the result
    // if (location)
    // {        
    // var geofire = new GeoFire(database.ref("Users").child("Drivers").child(shopUID));
    // geofire.get("location").then(shoplocation => 
    // {
    //     if (distanceBetween(shoplocation, location) < 1)
    //     {
    //         //continue and send the user the appropriate response
    //     }
    // });
    // }

    database.ref("Users").child("Drivers").child(shopUID).once('value', (snapshot) => 
    {
        if (snapshot.exists())
        {
            callback(snapshot.val())
        }
        else
        {
            callback(null);
        }
    });
};

const getMenuItemDetails = function (shopUID, callback)
{
    database.ref("Users").child("Drivers").child(shopUID).child("menu").once('value', (snapshot) => 
    {
        if (snapshot.exists())
        {
            callback(snapshot.val())
        }
        else
        {
            callback(null);
        }
    });
}

const addOrderToRecord = function (orderDetails, callback)
{
    let userId = orderDetails.user;
    let shopId = orderDetails.shopId;
    checkUserExistsDatabase(userId, "Customers", function (result)
    {
        if (result.error)
        {
            callback(result);
            return;
        }

        if (!result.exists)
        {
            callback({ error: true, success: false, message: "User does not exist" });
            return;
        }

        database.ref("Users").child("Customers").child(userId).child("Orders").child("Current").set({ orderTime: Date().now(), item: orderDetails.name, price: orderDetails.price, location: orderDetails.location, shopId })
            .then(value => 
            {
                database.ref("Users").child("Drivers").child(shopId).child("Orders").child("Current").child(userId).set({ orderTime: Date().now(), item: orderDetails.name, price: orderDetails.price, location: orderDetails.location, userId })
                    .then(value => 
                    {
                        callback({ error: false, success: true, message: "Order Placed Successfully" });
                    })
                    .catch(error => 
                    {
                        callback({ error: true, success: false, message: error, data: null });
                    });
            })
            .catch(error => 
            {
                callback({ error: true, success: false, message: error, data: null });
            });
    });
};

module.exports = { registerUserToDatabase, addMenuItem, getUidFromToken, deleteMenuIten, getShopDetails, addOrderToRecord, getMenuItemDetails };