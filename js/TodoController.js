
(function($) {
    $(document).ready(function() {
        var container = $(".todo-list");
        var addBtn = container.find(".jsAdd");
        var addField = container.find(".jsAddField");
        var head = container.find(".jsHead");
        var items;

        //TODO use jade
        var content = '<div class="todo-list__item">\
                       <div class="item">\
                            <div class="item__checkbox">\
                                <input type="checkbox"/>\
                            </div>\
                            <div class="item__content">\
                                <%= title%>\
                            </div>\
                            <div class="item__remove">\
                                <span class="fa fa-times-circle-o"></span>\
                            </div>\
                        </div>\
                    </div>';

        var tpl = _.template(content);

        addBtn.on("click", function () {
            var item = addField.val();

            if(_.isEmpty(item)) {
                console.log("nothing to add");
                return;
            }

            var html = tpl({title : item});
            head.after(html);
            head.removeClass("jsHead");
            head = head.next();
            head.addClass("jsHead");

            //add event handlers
            head.find(".item__remove").on("click", function () {
                var $item = $(this).parent().parent();
                if($item.hasClass("jsHead")) {
                    head = $item.prev();
                    head.addClass("jsHead");
                }
                $item.remove();
            });

            head.find(".item__checkbox").on("change", function() {
                var $item = $(this).parent();
                $item.find(".item__content").toggleClass("done-item", this.checked);
            });

        });


    });

})(jQuery);