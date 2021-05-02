const firebase = require("./FirebaseManager");

const express = require("express");
const app = express();
const port = 3030;

const { body, validationResult, header } = require("express-validator");

const onlineShops = [];

const timeToDeliver = 60 * 45; //45 minutes
const timeToCancel = 60; //1 minute

const orders = [];

app.use(express.json());

app.post("/shop/register", [header("token").isString(), body("name").isString(), body("profileImageUrl").isURL(), body("location").isLatLong(), body("phone").isMobilePhone()], (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }
    const location = req.body.location.split(',');
    const latitude = Number.parseFloat(location[0]);
    const longitude = Number.parseFloat(location[1]);
    const userDetails = req.body;
    userDetails.location = { latitude, longitude };

    firebase.registerUserToDatabase(req.headers.token, "Drivers", userDetails, (result) => 
    {
        return res.json(result);
    });
});

app.post("/shop/open", [header("token").isString()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.getUidFromToken(req.headers.token, (result) => 
    {
        if (result.error)
        {
            res.status(400).json({ error: true, success: false, message: result.message });
            return;
        }

        onlineShops.pushIfNotExist(result.uid);
        res.json({ error: false, success: true, message: "Shop is now ready to take orders" });
    });
});

app.delete("/shop/open", [header("token").isString()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.getUidFromToken(req.headers.token, function (result)
    {
        if (result.error)
        {
            res.status(400).json({ error: true, success: false, message: result.error });
            return;
        }

        onlineShops.spliceIfExist(result.uid);

        res.json({ error: false, success: true, message: "Shop is now unavailable to accept orders!" });
    });
});

app.post("/shop/menu", [header("token").isString(), body("title").isString(), body("description").isString(), body("price").isNumeric(), body("imageUrl").isURL()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.addMenuItem(req.headers.token, req.body, (result) =>
    {
        return res.json(result);
    });
});

app.get("/shop/menu", [header("token").isString()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.getUidFromToken(req.headers.token, (result) => 
    {
        if (result.error)
        {
            return res.status(400).json({ error: true, success: false, message: result.message });
        }
        const uid = result.uid;

        firebase.getShopDetails(null, uid, (result) => 
        {
            if (result.error)
            {
                return res.status(400).json({ error: true, success: false, message: result.message });
            }

            result.uid = uid;
            return res.json({ error: false, success: true, data: result });

        });
    });
});

app.delete("/shop/menu", [header("token").isString(), body("title").isString()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.deleteMenuIten(req.headers.token, req.body.title, (result) => 
    {
        return res.json(result);
    });
});

app.post("/user/register", [header("token").isString(), body("name").isString(), body("profileImageUrl").isURL(), body("phone").isMobilePhone()], (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.registerUserToDatabase(req.headers.token, "Customers", req.body, (result) => 
    {
        return res.json(result);
    });
});

app.get("/user/menu", [header("token").isString(), body("location").isLatLong()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }
    if (onlineShops.length < 1)
    {
        res.json({ error: false, success: false, message: "No shops are available to take orders", data: null });
    }

    var shops = [];

    firebase.getUidFromToken(req.headers.token, (result) => 
    {
        if (result.error)
        {
            res.status(400).json({ error: true, success: false, message: result.message });
            return;
        }

        onlineShops.forEach(element =>    
        {

            firebase.getShopDetails(req.body.location, element, (result) => 
            {
                result.id = element;
                shops.push(result);

                if (shops.length == onlineShops.length)
                {
                    var finalshops = [];
                    shops.forEach(shop =>
                    {
                        if (shops != null)
                        {
                            finalshops.push(shop);
                        }
                    });

                    res.json({ error: false, success: true, message: "Shops available are..", data: finalshops });
                    return;
                }
            });
        });
    });
});

app.post("/user/menu/order", [header("token").isString(), body("location").isLatLong(), body("shopId").isIn(onlineShops).withMessage("The shopId is either invalid or the shop is not accepting orders!"), body("item").isString()], (req, res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({ error: true, message: errors.array(), success: false });
    }

    firebase.getMenuItemDetails(req.body.shopId, (result) => 
    {
        let orderItem;
        if (result == null)
        {
            return res.status(400).json({ error: true, success: false, message: "Shop doesn't have any menu items!" });
        }
        // orderItem = result.find(e => e.title === req.body.item);
        orderItem = result[req.body.item];

        if (orderItem === undefined)
        {
            return res.status(400).json({ error: true, success: false, message: "Shop doesn't have the specified menu item!" });
        }

        firebase.getUidFromToken(req.headers.token, (result) => 
        {
            if (result.error)
            {
                res.status(400).json({ error: true, success: false, message: result.message });
                return;
            }

            if (orders.some(e => e.user === result.uid))
            {
                return res.status(400).json({ error: true, success: false, message: "You have already placed an order, please wait for it to deliver!" });
            }
            order = { user: result.uid, timestamp: Date().now(), shopId: req.body.shopId, location: req.body.location, price: orderItem.price, name: orderItem.title };
            orders.push(order);

            firebase.addOrderToRecord(order, (result) => 
            {
                if (result.error)
                {
                    res.status(400).json({ error: true, success: false, message: result.message });
                    return;
                }

                return res.json(result);
            });
        });
    });
});

app.listen(port, () =>
{
    console.log("Listening on port + " + port);
});

// adds an element to the array if it does not already exist
Array.prototype.pushIfNotExist = function (element)
{
    if (!this.includes(element))
    {
        this.push(element);
    }
}

Array.prototype.spliceIfExist = function (element)
{
    const index = this.indexOf(element);
    if (index > -1)
    {
        this.splice(index, 1);
    }
}


