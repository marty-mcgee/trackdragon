/**
 * Application entry point
 *
 * @file        app.js
 * @author      Jan Myler <honza.myler[at]gmail.com>
 * @copyright   Copyright 2012, Jan Myler (http://janmyler.com)
 * @license     MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 */

define(function(require) {
	// general
	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),

	// helpers
		PlayerH = require('Dragon/Helpers.Player'),
		DisplayH = require('Dragon/Helpers.Display'),

	// models
		ProjectM = require('Dragon/Models.Project'),

	// collections
		TracksC = require('Dragon/Collections.Tracks'),
		ClipsC = require('Dragon/Collections.Clips'),
	// views
		PlaybackControlsV = require('Dragon/Views.PlaybackControls'),
		EditableNameV = require('Dragon/Views.EditableName'),
		EditorV = require('Dragon/Views.Editor'),
		TracksV = require('Dragon/Views.Tracks'),
		MenuV = require('Dragon/Views.Menu'),
		TimelineV = require('Dragon/Views.Timeline'),

	// templates
		AlertT = require('text!templates/AlertModal.html');

	// plugins without reference
		require('plugins/modal');


	// Dragon global object
	var Dragon = {
		Collections: {},
		Models: {},
		Views: {},
	};
	Dragon.Display = new DisplayH;
	Dragon.Player = new PlayerH;

	// application initialization
	var init = function() {
		window.Dragon = Dragon;										// global reference to object
		
		Dragon.Collections.Tracks = new TracksC;	// tracks collection
		
		Dragon.Models.Project = new ProjectM;			// default project model
		
		Dragon.Views.Editor = new EditorV({				// editor wrapper view
			model: Dragon.Models.Project
		});	
		
		Dragon.Views.Timeline = new TimelineV;		// editor timeline view
		
		Dragon.Views.Tracks = new TracksV({				// tracks collection view
			collection: Dragon.Collections.Tracks,
			el: '#tracks'
		}).render();											
		
		new EditableNameV({												// editable project name view
			model: Dragon.Models.Project,
			el: '#project-name',
			hasColor: false
		});
		
		Dragon.Views.PlaybackControls = new PlaybackControlsV({	// playback controls view
			model: Dragon.Models.Project
		});

		//if (typeof webkitAudioContext !== 'undefined' || typeof AudioContext !== 'undefined') 
		if (typeof AudioContext !== 'undefined') 
			Dragon.Views.Menu = new MenuV;					// show menu only if app is supported

		// prompts user before leaving the app page
		window.onbeforeunload = function(e) {
			e = e || window.event;
			
			// for IE and Firefox prior to version 4
			if (e) 
		    	e.returnValue = 'By leaving this page, all changes will be lost.';
		  	
			// for Chrome, Safari and Opera 12+
			return 'By leaving this page, all changes will be lost.';
		};
	};
	
	return {	
		initialize: init
	};
});