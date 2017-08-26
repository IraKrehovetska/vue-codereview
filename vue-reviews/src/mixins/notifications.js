export const notificationMixin = {
    data () {
        return {
            authorizationKey : 'AAAAC4k508o:APA91bFnkYEk65whx5mjMow2O4S1Y0NjGDWeqoRq6gdAmEw5G_IfolxrtHkQvx4nuFb3qE09djgWi_V0PJmtlLi2v_VPTpOabtpI3ESYoOIpV_mMQPai5TbeYtswoE5zhkk6MruKJumB'
        }
    },
    methods: {
        submitNotification(owner, requester, type, status) {

            let notification = {
              'title': 'Hello ' + owner['.key'],
              'body': '',
              'icon' : requester.photoURL,
              'click_action' : window ? window.location.href : ''
            };

            if (type==='informOwner') {
                notification.body = requester.alias + ' updated status of your changeset to ' + status
            } else if (type==='informReviewer') {
                notification.body = requester.alias + ' added new changest, please review at your earliest convenience!'
            }

            if (notification.body) {
                this.triggerNotificationSend(notification, owner.token)
            }
        },
        triggerNotificationSend(notification, token) {

            fetch('https://fcm.googleapis.com/fcm/send', {
              'method': 'POST',
              'headers': {'Authorization': 'key=' + this.authorizationKey, 'Content-Type': 'application/json'},
              'body': JSON.stringify({'notification': notification, 'to': token})
            }).then(()=>{console.debug("Bob: Notification sent to the reviewer.");
            }).catch((error)=>{console.warn("Bob: Notification wasn't sent:( Oopps.", error) });

        }
    }
};
