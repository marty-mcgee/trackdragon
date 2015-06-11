/**
 * View for a collection of tracks
 *
 * @file        Views.Tracks.js
 * @author      Jan Myler <honza.myler[at]gmail.com>
 * @copyright   Copyright 2012, Jan Myler (http://janmyler.com)
 * @license     MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'Dragon/Views.Track'
], function($, _, Backbone, TrackV) {
    
    return Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'render', 'addAll', 'addOne', 'zoomChange', 'scrollChange');
            this.collection.bind('add', this.addOne);
            this.bind('Dragon:scroll', this.scrollChange);
            this.bind('Dragon:zoomChange', this.zoomChange);
        },

        render: function() {
            this.addAll();
            $(this.el).append('<div id="playback-position">');
            return this;
        },

        addAll: function() {
            this.collection.each(this.addOne);
        },

        addOne: function(model) {
            var track = new TrackV({model: model});
            $(this.el).append(track.render().el);
        },

        scrollChange: function() {
            var scrollLeft = Dragon.Views.Editor.scrollLeftOffset();
            
            $('div.track-info').css('left', scrollLeft + 'px');
            
            this.collection.each(function(model) {
                model.clips.trigger('Dragon:scroll');
            });
        },

        zoomChange: function() {
            this.collection.each(function(model) {
                model.trigger('Dragon:zoomChange');
                model.clips.trigger('Dragon:zoomChange');
            });
        },

        clearDisplays: function() {
            this.collection.each(function(model) {
                model.trigger('Dragon:clearDisplay');
            });
        }
    });
});