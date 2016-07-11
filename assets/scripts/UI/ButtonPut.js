var actorRenderer = require('ActorRenderer');
var Decks = require('Decks');
cc.Class({
    extends: cc.Component,

    properties: {
        upStationX:0,
        upStationY:0,
        cardsArray: {
            default: [],
            type:cc.SpriteFrame
        },
        
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng')
        if (audioMng) {
            audioMng = audioMng.getComponent('AudioMng');
        }
        var actor =cc.find('Canvas/playerLayer/anchorDealer/Dealer');
        if(actor){
            actor = actor.getComponent('ActorRenderer');
        }
        
        var game=cc.find('Game');
            game = game.getComponent('Game');
        var num = 0;
        var spawn = cc.sequence(cc.moveBy(0.5, 0, 30));
        var spawnDown = cc.sequence(cc.moveBy(0.5, 0, -30));
        var actionUp = cc.speed(spawn,5);
        var actionDown = cc.speed(spawnDown, 5);
        function onTouchDown (event){
            
            // cc.log('牌的id'+this.getComponent('Card').point.string);
            // cc.log('tag'+this.getComponent('Card').tag);
            var newCard = this.getComponent('Card');
            this.stopAllActions();
            if(audioMng) audioMng.playButton();
            if(num%2===0){
                game.addCards(newCard);
                this.runAction(actionUp);
                // actor.addPutCard(newCard);
                // renderer.addPutCard(newCard);
                // this.cardsArray.push(newCard);
                // cc.log('添加后数组的长度'+this.cardsArray.length);
                // this.cardsArray.push(newCard);
                // cc.log('添加后数组的长度'+this.putArray.length);
            }else{
                // for(var i=0;i<this.putArray.length;i++){
                //     var card = this.putArray[i];
                //     if(newCard.point.string === card.point.string && newCard.suit === card.suit){
                //         this.putArray.splice(i,1);
                //         cc.log('删除后数组的长度'+this.putArray.length);
                //     }
                    
                // }
                this.runAction(actionDown);
            }
            num++;
        }
        this.node.on('touchstart', onTouchDown, this.node);
    },
    
    // addCards: function (card){
    //     this.cardsArray.push(card);
    //     cc.log('添加后数组的长度'+this.cardsArray.length);
    // }
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});