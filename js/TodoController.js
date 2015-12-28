(function($) {
    $(document).ready(function() {
        var container = $(".todo-list");
        var addBtn = container.find(".jsAdd");
        var addField = container.find(".jsAddField");
        var search = container.find(".jsFieldSearch");
        var itemHolder= container.find(".todo-list__task-container");

        //TODO use jade
        var content = '<table class="todo-list__item">\
                       <tr class="item">\
                            <td class="item__checkbox">\
                                <input type="checkbox"/>\
                            </td>\
                            <td class="item__content">\
                                <%= title%>\
                            </td>\
                            <td class="item__remove">\
                                <span class="fa fa-times-circle-o"></span>\
                            </td>\
                        </tr>\
                    </table>';

        var tpl = _.template(content);

        addBtn.on("click", function () {
            addNewItem();
        });

        addField.on("keypress", function(e) {
            if(e.keyCode == 13 )
                addNewItem();
        });


        function addNewItem() {
            var name = addField.val();
            addField.val("");

            if(_.isEmpty(name)) {
                console.log("nothing to add");
                return;
            }

            var html = tpl({title : name});
            itemHolder.append(html);
            var newItem = itemHolder.last();

            //add event handlers
            newItem.find(".item__remove").on("click", function () {
                var $item = $(this).closest( "table" );
                $item.remove();
            });

            newItem.find(".item__checkbox").on("change", function() {
                var $item = $(this).parent();
                $item.find(".item__content").toggleClass("done-item", this.checked);
            });
        }

        search.on("keyup", function(e) {
            var word = this.value;
            var items = container.find(".todo-list__item:not(.todo-list__item_control)");

            items.find(".item__content").each(function(i, content) {
                var $content = $(content);

                if($content.text().indexOf(word) == -1)
                    $content.closest( "table" ).addClass("hidden");
                else
                    $content.closest( "table" ).removeClass("hidden");
            })
        });
    });
})(jQuery);