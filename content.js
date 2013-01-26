$(document).ready(function() {
  var puzzleHtml = chrome.extension.getURL('puzzle.html');

  makeIntoPuzzles = function(){
    if ($(".instadate .thumbnail img").length < 1){
      return;
    }

    $('#instadates').prepend("<div class='unscramble-header'>You are using the Crazy Unscrambler Chrome Extension!</div><div class='unscramble-small'>Click a picture tile, and then another to swap them. Now you can start unscrambling some crazies!</div>");
    clearInterval(refreshIntervalId);

    $(".instadate .thumbnail img").each(function(i,pic){
      var imageUrl = $(pic).attr('src');
      $(pic).parent().load(puzzleHtml, function(){
        tiles = $(this).find('img');
        tiles.attr('src', imageUrl);
        tiles.addClass(function(){
          parentPosition = $(this).parent().position();
          $(this).css('top', parentPosition.top * -1  + 'px');
          $(this).css('left', parentPosition.left * -1  + 'px');
        });

        var clickedTile = null;

        $(this).parent().find('.unscramble-tile').click(function(){
          if ($(this).hasClass('unscramble-clicked')){
            $(this).removeClass('unscramble-clicked');
            clickedTile = null;
            return;
          }
          $(this).parent().find('.unscramble-clicked').removeClass('unscramble-clicked');
          if(clickedTile == null){
            clickedTile = $(this).find('img');
            $(this).addClass('unscramble-clicked');
          }else{
            second = $(this).find('img');
            firstStyle = clickedTile.attr('style');
            secondStyle = second.attr('style');
            clickedTile.attr('style', secondStyle);
            second.attr('style', firstStyle);
            clickedTile = null;
          }
        });
      });
    });
  };

  var refreshIntervalId = setInterval(makeIntoPuzzles, 1000);
});