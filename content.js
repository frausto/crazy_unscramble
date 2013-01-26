$(document).ready(function() {
  $('#instadates').prepend("<div id='unscramble-header'>You are using the Crazy Unscrambler Chrome Extension!</div><div class='unscramble-small'>Functionality is Loading...</div>");
  var puzzleHtml = chrome.extension.getURL('puzzle.html');

  changeHeaderText = function(text){
    $('.unscramble-small').text(text);
  }

  intialSetupPuzzle = function(puzzleBox, imageUrl){
    tiles = $(puzzleBox).find('img');
    tiles.attr('src', imageUrl);
    tiles.addClass(function(){
      parentPosition = $(this).parent().position();
      $(this).css('top', parentPosition.top * -1  + 'px');
      $(this).css('left', parentPosition.left * -1  + 'px');
    });
  }

  tileSwapClick = function(puzzleBox){
    var clickedTile = null;

    $(puzzleBox).parent().find('.unscramble-tile').click(function(){
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
  }

  makeIntoPuzzles = function(){
    if ($(".instadate .thumbnail img").length < 1){
      return;
    }

    $(".instadate .thumbnail img").each(function(i,pic){
      if($(pic).parent().hasClass('unscramble-tile'))
        return true;
      var imageUrl = $(pic).attr('src');
      $(pic).parent().load(puzzleHtml, function(){
        intialSetupPuzzle(this, imageUrl);
        tileSwapClick(this);
      });
    });

    changeHeaderText('Click a picture tile, and then another to swap them. Now you can start unscrambling some crazies!')
  };

  setTimeout(makeIntoPuzzles, 3000);
  $('#instadate_availabledates').click(function(){
    changeHeaderText('Functionality is Loading...')
    setTimeout(makeIntoPuzzles, 3000);
  });
});