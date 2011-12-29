var vows = require('vows');
var assert = require('assert');
var events = require('events');
var hs = require('../index');

vows.describe('Connect').addBatch({
  'connecting' : {
    topic : function() {
      return function(options) {
        var emitter = new events.EventEmitter();
        var con = hs.connect(options);
        con.on('connect', function() {
          emitter.emit('success', con);
          con.close();
        });
        con.on('error', function(err) {
          emitter.emit('success', err);
        });
        return emitter;
      }
    },
    'with default host and port' : {
      topic : function(topic) {
        return topic();
      },
      'should create a new Connection object' : function(con) {
        assert.instanceOf(con, hs.Connection);
      }
    },
    'with specific host and port' : {
      topic : function(topic) {
        return topic({
          host : '127.0.0.1',
          port : 9999
        });
      },
      'should create a new Connection object' : function(con) {
        assert.instanceOf(con, hs.Connection);
      }
    },
    'with illegal port' : {
      topic : function(topic) {
        return topic({
          port : 10000
        });
      },
      'should pass an Error object' : function(con) {
        assert.instanceOf(con, Error);
      }
    }
  }
}).export(module);
