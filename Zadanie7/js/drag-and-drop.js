$(document).ready(function()
{
    var adjustment

    var group = $(".drag").sortable({
        group: 'drag',
        itemSelector: 'img',
        containerSelector: 'div',
        vertical: false,
        placeholder: '<div class="placeholder" />',
        pullPlaceholder: false,

        onDragStart: function ($item, container, _super) {
            var offset = $item.offset(),
                pointer = container.rootGroup.pointer
            adjustment = {
                left: pointer.left - offset.left,
                top: pointer.top - offset.top
            }

            _super($item, container)
        },
        onDrop: function (item, container, _super) {

            $('#output').text(group.sortable("serialize").get().join("\n"))
            _super(item, container);
            $.each($('.img-thumbnail'),updateOrder);
            setOrderCookie(order);
        },
        onDrag: function ($item, position) {
            $item.css({
                width: 180,
                height: 180,
                left: position.left - adjustment.left,
                top: position.top - adjustment.top
            })
        },
        serialize: function (parent, children, isContainer) {
            return isContainer ? children.join() : parent.attr('rel')
        }
    })
});


