import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';


class StickyHeader {
    constructor() {
        this.lazyImages = $('.lazyload');
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();
        this.pageSection = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
        
    }
    
    refreshWaypoints() {
        //when the images is loaded with on 'load' even we are running the function
        this.lazyImages.on('load', function(){
            Waypoint.refreshAll();
        });
    }
    
    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }
    
    createHeaderWaypoint() {
        var that = this; //this points to our class
        new Waypoint({
            element: this.headerTriggerElement[0], /* 2 */
            handler: function(direction) {
                that.siteHeader.toggleClass("site-header--dark");
                that.headerLinks.removeClass("is-current-link");
            }/* 3 */
        }); /* 1 */
    }
    
    createPageSectionWaypoints() {
        var that = this;
        /* 4 */
        this.pageSection.each(function() {
            var currentPageSection = this; //current page section in a loop
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == 'down'){
                        var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                        that.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                /* 5 */
                offset: '18%'
            });
            
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == 'up'){
                        var matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                        that.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                /* 5 */
                offset: '-40%'
            });
        });
    }
}

export default StickyHeader;

/* 
1. We have access to a new Waypoint class because we included waypoint library up at the top of the page.

2.Which element on the page we want to be our trigger, when the sticky nav bar will change a background to a darder color. We will use our main heading as a trigger. When nav bar touches the botoom , passes that heading it it will change the color to a darker one.

2.1 In element JavaScript expects a JavaScript native a DOM element, but currently we are passing it a jQuery objects. We can acces a native DOM element by adding [0] : because the first item in a jQuery-like object is always a pointer to a native DOM element. 

3. Handler describes what we want to do with the selected element, we want to add a new modifier class to make a darker background on a scticky header. 

4.Each method loops through each of the element in the page section collection and wiht a function we can do something to each element

4.1 Withing each loop jQuery points with a this keyword to a DOM element that it currently has been looped through

5.We are customizing how early or late on a scroll waypoint is triggered
Waypoint will be triggered when the current section is 18% far from the top of the screen.

*/