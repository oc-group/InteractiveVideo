$( document ).ready(function() {
	il.InteractiveVideoPlayerFunction.appendInteractionEvents();
});

var player = null;

(function ($) {

	il.Util.addOnLoad(function () {
		il.InteractiveVideo.last_stopPoint = -1;

		var options = {};

		player = plyr.setup('#ilInteractiveVideo')[0];
		var interval = null;

			il.InteractiveVideoPlayerAbstract.config = {
				pauseCallback              : (function (){player.pause();}),
				playCallback               : (function (){player.play();}),
				durationCallback           : (function (){return player.getDuration();}),
				currentTimeCallback        : (function (){return player.getCurrentTime();}),
				setCurrentTimeCallback     : (function (time){player.seek(time);}),
				external : false
			};

			il.InteractiveVideoPlayerComments.fillEndTimeSelector(il.InteractiveVideoPlayerAbstract.duration());
			$('#ilInteractiveVideo').prepend($('#ilInteractiveVideoOverlay'));

			player.on('seeked', function() {
				clearInterval(interval);
				il.InteractiveVideoPlayerFunction.seekingEventHandler();
			});

			player.on('pause', function() {
				clearInterval(interval);
				il.InteractiveVideo.last_time = il.InteractiveVideoPlayerAbstract.currentTime();
			});

			player.on('ended', function() {
				il.InteractiveVideoPlayerAbstract.videoFinished();
			});

			player.on('playing', function() {

				if(il.InteractiveVideo.video_mode == 0)
				{
					interval = setInterval(function () {
						il.InteractiveVideoPlayerFunction.playingEventHandler(interval, player);
					}, 500);
				}
				else
				{
					il.InteractiveVideoPlayerAdventure.Init();

					interval = setInterval(function () {
						il.InteractiveVideoPlayerAdventure.playingEventHandler(interval, player);
					}, 500);
				}

			});


			player.on('ready', function(e){
				il.InteractiveVideoPlayerAbstract.readyCallback();
			});
	});
})(jQuery);