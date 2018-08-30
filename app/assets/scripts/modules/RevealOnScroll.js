import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(elements, offset) {
        this.itemsToReveal = elements;
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWaypoints();
       
    }
    hideInitially() {
        this.itemsToReveal.addClass('reveal-item');
    }
    createWaypoints() {
        var that = this;
        this.itemsToReveal.each(function() {
            var currentItem = this; //current element
            new Waypoint({
                element: currentItem,
                handler: function() {
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: that.offsetPercentage
            });
        });
    }
}

export default RevealOnScroll;

/* 
element: is a DOM element we are watching for
handler: is what we want to this element to happen when we scrolled to it


*/