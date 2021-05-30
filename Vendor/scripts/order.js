class orderRoom {
    constructor(room){
        this.chats = db.collection('orders');
        this.room = room;
        this.unsub;
    }
    async changeOrderStatus(status, ID){
        let response = await this.chats.doc(ID).update({
            OrderStatus: status
        });
        return response
    }
    // async storeOrder(ID, data){
    //     await firestore()
    //         .collection('history')
    //         .doc(ID)
    //         .set({
    //             Order: data.Order,
    //             UserID: data.UserID,
    //             Name: data.Name,
    //             RollNo: data.RollNo,
    //             Department: data.Department,
    //             ContactNo: data.ContactNo,
    //             Email: data.Email,
    //             Total: data.total,
    //             OrderTime: data.OrderTime,

    //         })
    // }
    async getOrders(callback){
        this.unsub = await this.chats
        .where('OrderStatus', '==', this.room)
        .orderBy("OrderTime")
        .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach(change => {
                if(change.type === "added" || change.type === "modified"){
                    callback(change.doc.data())
                }
            })
        })
    }
    updateRoom(room){
        this.room = room;
        console.log("room updated");
        if(this.unsub){
            this.unsub();
        }

    }
    
}