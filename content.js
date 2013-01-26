console.log("START");

imageUrl = $(".instadate .thumbnail img").attr('src');
var puzzleHtml = chrome.extension.getURL('puzzle.html');

$('.instadate').load(puzzleHtml, function(){
  tiles = $(this).find('img');
  tiles.attr('src', imageUrl);
  tiles.addClass(function(){
    parentPosition = $(this).parent().position();
    $(this).css('top', parentPosition.top * -1  + 'px')
    $(this).css('left', parentPosition.left * -1  + 'px')
  });
});


console.log("END");
