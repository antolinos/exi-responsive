function Session(token){
    this.token = token;
    this.onSuccess = new Event(this);
}

Session.prototype.load = function(startDate, endDate){
    var _this = this;
    startDate = "20160308";
    endDate = "20160308";
    var sessionDataAdapter = new SessionDataAdapter({
        token   : this.token,
        url     : Config.url
    });
    
    sessionDataAdapter.onSuccess.attach(function(sender, sessions){
        
       _this.onSuccess.notify(sessions);
       _this.sessions = sessions;
    });
    sessionDataAdapter.getSessionsByDate(startDate, endDate);
};


Session.prototype.getDataCollectionBySessionId = function(sessionId){
    var _this = this;
    
    var dataCollectionDataAdapter = new DataCollectionDataAdapter({
        token   : this.token,
        url     : Config.url
    });
    
    dataCollectionDataAdapter.onSuccess.attach(function(sender, dataCollections){
       _this.onSuccess.notify(dataCollections);
       _this.dataCollections = dataCollections;
    });
    dataCollectionDataAdapter.getDataCollectionViewBySessionId(sessionId);
};
