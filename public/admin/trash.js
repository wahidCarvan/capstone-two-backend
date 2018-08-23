// tells jquery not to run until the html document is fully loaded
$(function(){



  
$('#js-shopping-list-form').submit(function(event) {
  
  event.preventDefault();
  
  const listItem = $('.js-shopping-list-entry').val();
  
  $('.js-shopping-list-entry').val('');
  
  $('.shopping-list').append(
      `<li>
        <span class="shopping-item">${listItem}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`);
  });
  
   $('.shopping-list').on('click', '.shopping-item-delete', function(event) {

    // this will look for the closest parent `li` element and remove it from the DOM.
    // in other words, it will remove the shopping list item.
    $(this).closest('li').remove();
  });
  
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {

    // go up to the parent li, then from there find the child`.shopping-item`  and
    // toggle the `.shopping-item__checked` class.
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  });
  
});