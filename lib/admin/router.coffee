Router.route "adminViewShares",
    path: "/admin/:collection/:_id/shares"
    template: "adminMissionShares"
    controller: "AdminController"
    waitOn: ->
        [
            Meteor.subscribe 'adminCollectionDoc', @params.collection, @params._id
            Meteor.subscribe 'share', { missionId: @params._id }, { sort: { likesQty: -1 } }
        ]
    action: ->
        @render()
    onAfterAction: ->
        Session.set 'admin_title', AdminDashboard.collectionLabel @params.collection
        Session.set 'admin_subtitle', 'Bearbeiten ' + @params._id
        Session.set 'admin_collection_page', 'bearbeiten'
        Session.set 'admin_collection_name', @params.collection.charAt(0).toUpperCase() + @params.collection.slice(1)
        Session.set 'admin_id', @params._id
        Session.set 'admin_doc', adminCollectionObject(@params.collection).findOne _id : @params._id
    data: ->
        admin_collection: adminCollectionObject @params.collection
