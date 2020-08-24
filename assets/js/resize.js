
         var ActionsEnum = {
             None: 0,
             LeftResize: 1,
             TopResize: 2,
             RightResize: 3,
             BottomResize: 4,
             TopLeftResize: 5,
             BottomLeftResize: 6,
             TopRightResize: 7,
             BottomRightResize: 8,
             Move: 9
         }

         var externalWrapperQueryStr = '#wrapper';
         var internalWrapperQueryStr = externalWrapperQueryStr + ' .internalWrapper';
         // Query strings for the action-triggers.
         var moveActionTriggerQueryStr = externalWrapperQueryStr + ' .moveActionTrigger';
         var topActionTriggerQueryStr = externalWrapperQueryStr + ' .topActionTrigger';
         var bottomActionTriggerQueryStr = externalWrapperQueryStr + ' .bottomActionTrigger';
         var leftActionTriggerQueryStr = externalWrapperQueryStr + ' .leftActionTrigger';
         var rightActionTriggerQueryStr = externalWrapperQueryStr + ' .rightActionTrigger';
         var topLeftActionTriggerQueryStr = externalWrapperQueryStr + ' .topLeftActionTrigger';
         var topRightActionTriggerQueryStr = externalWrapperQueryStr + ' .topRightActionTrigger';
         var bottomLeftActionTriggerQueryStr = externalWrapperQueryStr + ' .bottomLeftActionTrigger';
         var bottomRightActionTriggerQueryStr = externalWrapperQueryStr + ' .bottomRightActionTrigger';

         // Query strings for the resizing border's drawings.IMPORTANT
         var topDrawingQueryStr = externalWrapperQueryStr + ' .topDrawing';
         var bottomDrawingQueryStr = externalWrapperQueryStr + ' .bottomDrawing';
         var leftDrawingQueryStr = externalWrapperQueryStr + ' .leftDrawing';
         var rightDrawingQueryStr = externalWrapperQueryStr + ' .rightDrawing';
         var topLeftDrawingQueryStr = externalWrapperQueryStr + ' .topLeftDrawing';
         var topRightDrawingQueryStr = externalWrapperQueryStr + ' .topRightDrawing';
         var bottomRightDrawingQueryStr = externalWrapperQueryStr + ' .bottomRightDrawing';
         var currentAction = ActionsEnum.None;

         var lastMouseX = 0;
         var lastMouseY = 0;

         var cornerActionTriggerRadius = 8;

         function initializeEventHandlers() {
             $(moveActionTriggerQueryStr).mousedown(function (event) {
                 currentAction = ActionsEnum.Move;
             });
             $(bottomActionTriggerQueryStr).mousedown(function (event) {
                 currentAction = ActionsEnum.BottomResize;
             });
             $(rightActionTriggerQueryStr).mousedown(function (event) {
                 currentAction = ActionsEnum.RightResize;
             });
             $(bottomRightActionTriggerQueryStr).mousedown(function (event) {
                 currentAction = ActionsEnum.BottomRightResize;
             });

             $(document).mouseup(function (event) {
                 // Clear the current action.
                 currentAction = ActionsEnum.None;
             });

             $(document).mousemove(function (event) {
                 onMouseMove(event);
             });
         }

         function onMouseMove(event) {
             var currMouseX = event.clientX;
             var currMouseY = event.clientY;

             var deltaX = currMouseX - lastMouseX;
             var deltaY = currMouseY - lastMouseY;

             applyMouseMoveAction(deltaX, deltaY);

             lastMouseX = event.pageX;
             lastMouseY = event.pageY;
         }

         function applyMouseMoveAction(deltaX, deltaY) {
             var deltaTop = 0;
             var deltaLeft = 0;
             var deltaWidth = 0;
             var deltaHeight = 0;

             if (currentAction == ActionsEnum.RightResize ||
                 currentAction == ActionsEnum.TopRightResize ||
                 currentAction == ActionsEnum.BottomRightResize) {
                 deltaWidth = deltaX;
             }


             if (currentAction == ActionsEnum.BottomResize ||
                 currentAction == ActionsEnum.BottomLeftResize ||
                 currentAction == ActionsEnum.BottomRightResize) {
                 deltaHeight = deltaY;
             }

             if (currentAction == ActionsEnum.Move) {
                 deltaLeft = deltaX;
                 deltaTop = deltaY;
             }

             updatePosition(deltaLeft, deltaTop);
             updateSize(deltaWidth, deltaHeight);
             adjustWrapper();
         }
         function updateSize(deltaWidth, deltaHeight) {
             // Calculate the new size.
             var elemWidth = parseInt($("#mySheet").width());
             var elemHeight = parseInt($("#mySheet").height());
             var newWidth = elemWidth + deltaWidth;
             var newHeight = elemHeight + deltaHeight;

             // Don't allow a too small size.
             var minumalSize = cornerActionTriggerRadius * 2;
             if (newWidth < minumalSize) {
                 newWidth = minumalSize;
             }
             if (newHeight < minumalSize) {
                 newHeight = minumalSize;
             }
             // Set the new size.
             $("#mySheet").css('width', newWidth + 'px');
             $("#mySheet").css('height', newHeight + 'px');
         }

         function updatePosition(deltaLeft, deltaTop) {
             // Calculate the new position.
             var elemLeft = parseInt($(externalWrapperQueryStr).css('left'));
             var elemTop = parseInt($(externalWrapperQueryStr).css('top'));
             var newLeft = elemLeft + deltaLeft;
             var newTop = elemTop + deltaTop;

             // Set the new position.
             $(externalWrapperQueryStr).css('left', newLeft + 'px');
             $(externalWrapperQueryStr).css('top', newTop + 'px');
         }

         function adjustWrapper() {
             var elemWidth = parseInt($("#mySheet").width());
             var elemHeight = parseInt($("#mySheet").height());
             var externalWrapperWidth = (elemWidth + cornerActionTriggerRadius * 2) + 'px';
             var externalWrapperHeight = (elemHeight + cornerActionTriggerRadius * 2) + 'px';

             $(internalWrapperQueryStr).width($("#mySheet").width());
             $(internalWrapperQueryStr).height($("#mySheet").height());
             $(externalWrapperQueryStr).width(externalWrapperWidth);
             $(externalWrapperQueryStr).height(externalWrapperHeight);

             // Adjust the resizing border.
             adjustResizingBorder();
         }

         function adjustResizingBorder() {
             var elemWidth = parseInt($("#mySheet").width());
             var elemHeight = parseInt($("#mySheet").height());

             // Get the minimum and maximum values for X and Y.
             var minX = cornerActionTriggerRadius + 'px';
             var minY = cornerActionTriggerRadius + 'px';
             var maxX = (cornerActionTriggerRadius + elemWidth) + 'px';
             var maxY = (cornerActionTriggerRadius + elemHeight) + 'px';

             // Adjust moving rectange.
             setRectangleAttributes(moveActionTriggerQueryStr, minX, minY, elemWidth + 'px', elemHeight + 'px');

             // Adjust resizing border lines.
             setLineAttributes(topDrawingQueryStr, minX, minY, maxX, minY);
             setLineAttributes(bottomDrawingQueryStr, minX, maxY, maxX, maxY);
             setLineAttributes(leftDrawingQueryStr, minX, minY, minX, maxY);
             setLineAttributes(rightDrawingQueryStr, maxX, minY, maxX, maxY);
             setLineAttributes(topActionTriggerQueryStr, minX, minY, maxX, minY);
             setLineAttributes(bottomActionTriggerQueryStr, minX, maxY, maxX, maxY);
             setLineAttributes(leftActionTriggerQueryStr, minX, minY, minX, maxY);
             setLineAttributes(rightActionTriggerQueryStr, maxX, minY, maxX, maxY);

             // Adjust resizing border circles.
             setCircleAttributes(topLeftDrawingQueryStr, minX, minY);
             setCircleAttributes(topRightDrawingQueryStr, maxX, minY);
             setCircleAttributes(bottomRightDrawingQueryStr, maxX, maxY);
             setCircleAttributes(topLeftActionTriggerQueryStr, minX, minY);
             setCircleAttributes(topRightActionTriggerQueryStr, maxX, minY);
             setCircleAttributes(bottomLeftActionTriggerQueryStr, minX, maxY);
             setCircleAttributes(bottomRightActionTriggerQueryStr, maxX, maxY);
         }

         function setRectangleAttributes(rectQueryStr, x, y, width, height) {
             var rectElem = $(rectQueryStr);
             rectElem.attr('x', x);
             rectElem.attr('y', y);
             rectElem.attr('width', width);
             rectElem.attr('height', height);
         }

         function setLineAttributes(lineQueryStr, x1, y1, x2, y2) {
             var lineElem = $(lineQueryStr);
             lineElem.attr('x1', x1);
             lineElem.attr('y1', y1);
             lineElem.attr('x2', x2);
             lineElem.attr('y2', y2);
         }

         function setCircleAttributes(circleQueryStr, cx, cy) {
             var circleElem = $(circleQueryStr);
             circleElem.attr('cx', cx);
             circleElem.attr('cy', cy);
         }

         $(function () {
             adjustWrapper();
             initializeEventHandlers();
         });
