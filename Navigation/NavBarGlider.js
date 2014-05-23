function NavEffects() {
/*------------------------------------------------------------------------*/
    var dests = new Array();
    var selectedNode = null;
    var isNaving = false;
    
    var glider = $("#navigationSprite");
    var navItem = $(".navigationItem");
/*------------------------------------------------------------------------*/
    function scrollWindowTo(target) {
        isNaving = true;
        $('html, documentElement').clearQueue().animate({
            scrollTop: target
        }, 1000, function(){isNaving = false;});        
    }

    function relativeOffset(item) { // item is jQuery object
        return item.offset().left - $(".navigationMenu").offset().left;
    }

    function currentPage() {
        if (dests.length == 0) return;
        var rtnVal = null;
        dests.forEach(function(entry){
            var dis = (entry.tar - $(window).scrollTop());
            if (dis <= $(window).height()/2 && (dis + entry.height >= 0)){
                rtnVal = entry;
            }
        });
        return rtnVal;
    }
/*------------------------------------------------------------------------*/
    this.initialize =  function() {
        $('.logo').click(function(){
            scrollWindowTo(0);
            selectedNode = null;
            glider.css({opacity:0});
            navItem.removeClass("selected");
        });

        navItem.each(function() {
            var contentName = $(this).text();
            var dst = '#start' + contentName;
            var target = $(dst).offset().top;

            var moveTo = relativeOffset($(this));

            dests.push({
                obj: $(this),
                tar: target,
                navtar: moveTo,
                height: $(dst).height() + $('.'+contentName.toLowerCase()+'Div').height()
            });

            $(this).click(function(){
                scrollWindowTo(target);
                selectedNode = $(this);

                navItem.not($(this)).removeClass("selected");
                $(this).addClass("selected");
            });

            $(this).mouseenter(function(){
                if (selectedNode == null)
                    glider.css({opacity:1});
                glider.css({left:moveTo});
                if (selectedNode !== $(this) && selectedNode.hasClass("selected")) {
                    selectedNode.removeClass("selected");
                }
            });

            $(this).mouseleave(function() {
                if (selectedNode == null) {
                    glider.css({opacity:0});
                } else {
                    glider.css({left:relativeOffset(selectedNode)});
                }
                if (selectedNode !== $(this) && !selectedNode.hasClass("selected")) {
                    selectedNode.addClass("selected");
                }
            });
        });

        $(window).scroll(function () { 
            if (isNaving) return;
            if (currentPage() != null) {
                var curr = currentPage().obj;
                navItem.not(curr).removeClass("selected");
                curr.addClass("selected");
                selectedNode = currentPage().obj;
                glider.css({left:relativeOffset(selectedNode), opacity:1});
            } else {
                glider.css({opacity:0});
                navItem.removeClass("selected");
                selectedNode = null;
            }
        });
    };

    return this;
}

$(".navigationMenu").ready(function(){
    NavEffects().initialize();
});



