var m=function(i,t){return Number(i.slice(0,-1*t.length))},P=function(i){return i.endsWith("px")?{value:i,type:"px",numeric:m(i,"px")}:i.endsWith("fr")?{value:i,type:"fr",numeric:m(i,"fr")}:i.endsWith("%")?{value:i,type:"%",numeric:m(i,"%")}:i==="auto"?{value:i,type:"auto"}:null},k=function(i){return i.split(" ").map(P)},b=function(i,t,e,r){e===void 0&&(e=0),r===void 0&&(r=!1);var o=r?i+1:i,a=t.slice(0,o).reduce(function(u,h){return u+h.numeric},0),c=e?i*e:0;return a+c},S=function(i,t,e){return t.concat(e).map(function(r){return r.style[i]}).filter(function(r){return r!==void 0&&r!==""})},x=function(i,t){return t.endsWith(i)?Number(t.slice(0,-1*i.length)):null},w=function(i){for(var t=0;t<i.length;t++)if(i[t].numeric>0)return t;return null},l=function(){return!1},C=function(i,t,e){i.style[t]=e},s=function(i,t,e){var r=i[t];return r!==void 0?r:e};function G(i){var t;return(t=[]).concat.apply(t,Array.from(i.ownerDocument.styleSheets).map(function(e){var r=[];try{r=Array.from(e.cssRules||[])}catch{}return r})).filter(function(e){var r=!1;try{r=i.matches(e.selectorText)}catch{}return r})}var M="grid-template-columns",L="grid-template-rows",n=function(t,e,r){this.direction=t,this.element=e.element,this.track=e.track,t==="column"?(this.gridTemplateProp=M,this.gridGapProp="grid-column-gap",this.cursor=s(r,"columnCursor",s(r,"cursor","col-resize")),this.snapOffset=s(r,"columnSnapOffset",s(r,"snapOffset",30)),this.dragInterval=s(r,"columnDragInterval",s(r,"dragInterval",1)),this.clientAxis="clientX",this.optionStyle=s(r,"gridTemplateColumns")):t==="row"&&(this.gridTemplateProp=L,this.gridGapProp="grid-row-gap",this.cursor=s(r,"rowCursor",s(r,"cursor","row-resize")),this.snapOffset=s(r,"rowSnapOffset",s(r,"snapOffset",30)),this.dragInterval=s(r,"rowDragInterval",s(r,"dragInterval",1)),this.clientAxis="clientY",this.optionStyle=s(r,"gridTemplateRows")),this.onDragStart=s(r,"onDragStart",l),this.onDragEnd=s(r,"onDragEnd",l),this.onDrag=s(r,"onDrag",l),this.writeStyle=s(r,"writeStyle",C),this.startDragging=this.startDragging.bind(this),this.stopDragging=this.stopDragging.bind(this),this.drag=this.drag.bind(this),this.minSizeStart=e.minSizeStart,this.minSizeEnd=e.minSizeEnd,e.element&&(this.element.addEventListener("mousedown",this.startDragging),this.element.addEventListener("touchstart",this.startDragging))};n.prototype.getDimensions=function(){var t=this.grid.getBoundingClientRect(),e=t.width,r=t.height,o=t.top,a=t.bottom,c=t.left,u=t.right;this.direction==="column"?(this.start=o,this.end=a,this.size=r):this.direction==="row"&&(this.start=c,this.end=u,this.size=e)};n.prototype.getSizeAtTrack=function(t,e){return b(t,this.computedPixels,this.computedGapPixels,e)};n.prototype.getSizeOfTrack=function(t){return this.computedPixels[t].numeric};n.prototype.getRawTracks=function(){var t=S(this.gridTemplateProp,[this.grid],G(this.grid));if(!t.length){if(this.optionStyle)return this.optionStyle;throw Error("Unable to determine grid template tracks from styles.")}return t[0]};n.prototype.getGap=function(){var t=S(this.gridGapProp,[this.grid],G(this.grid));return t.length?t[0]:null};n.prototype.getRawComputedTracks=function(){return window.getComputedStyle(this.grid)[this.gridTemplateProp]};n.prototype.getRawComputedGap=function(){return window.getComputedStyle(this.grid)[this.gridGapProp]};n.prototype.setTracks=function(t){this.tracks=t.split(" "),this.trackValues=k(t)};n.prototype.setComputedTracks=function(t){this.computedTracks=t.split(" "),this.computedPixels=k(t)};n.prototype.setGap=function(t){this.gap=t};n.prototype.setComputedGap=function(t){this.computedGap=t,this.computedGapPixels=x("px",this.computedGap)||0};n.prototype.getMousePosition=function(t){return"touches"in t?t.touches[0][this.clientAxis]:t[this.clientAxis]};n.prototype.startDragging=function(t){if(!("button"in t&&t.button!==0)){t.preventDefault(),this.element?this.grid=this.element.parentNode:this.grid=t.target.parentNode,this.getDimensions(),this.setTracks(this.getRawTracks()),this.setComputedTracks(this.getRawComputedTracks()),this.setGap(this.getGap()),this.setComputedGap(this.getRawComputedGap());var e=this.trackValues.filter(function(u){return u.type==="%"}),r=this.trackValues.filter(function(u){return u.type==="fr"});if(this.totalFrs=r.length,this.totalFrs){var o=w(r);o!==null&&(this.frToPixels=this.computedPixels[o].numeric/r[o].numeric)}if(e.length){var a=w(e);a!==null&&(this.percentageToPixels=this.computedPixels[a].numeric/e[a].numeric)}var c=this.getSizeAtTrack(this.track,!1)+this.start;if(this.dragStartOffset=this.getMousePosition(t)-c,this.aTrack=this.track-1,this.track<this.tracks.length-1)this.bTrack=this.track+1;else throw Error("Invalid track index: "+this.track+". Track must be between two other tracks and only "+this.tracks.length+" tracks were found.");this.aTrackStart=this.getSizeAtTrack(this.aTrack,!1)+this.start,this.bTrackEnd=this.getSizeAtTrack(this.bTrack,!0)+this.start,this.dragging=!0,window.addEventListener("mouseup",this.stopDragging),window.addEventListener("touchend",this.stopDragging),window.addEventListener("touchcancel",this.stopDragging),window.addEventListener("mousemove",this.drag),window.addEventListener("touchmove",this.drag),this.grid.addEventListener("selectstart",l),this.grid.addEventListener("dragstart",l),this.grid.style.userSelect="none",this.grid.style.webkitUserSelect="none",this.grid.style.MozUserSelect="none",this.grid.style.pointerEvents="none",this.grid.style.cursor=this.cursor,window.document.body.style.cursor=this.cursor,this.onDragStart(this.direction,this.track)}};n.prototype.stopDragging=function(){this.dragging=!1,this.cleanup(),this.onDragEnd(this.direction,this.track),this.needsDestroy&&(this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),this.destroyCb(),this.needsDestroy=!1,this.destroyCb=null)};n.prototype.drag=function(t){var e=this.getMousePosition(t),r=this.getSizeOfTrack(this.track),o=this.aTrackStart+this.minSizeStart+this.dragStartOffset+this.computedGapPixels,a=this.bTrackEnd-this.minSizeEnd-this.computedGapPixels-(r-this.dragStartOffset),c=o+this.snapOffset,u=a-this.snapOffset;e<c&&(e=o),e>u&&(e=a),e<o?e=o:e>a&&(e=a);var h=e-this.aTrackStart-this.dragStartOffset-this.computedGapPixels,d=this.bTrackEnd-e+this.dragStartOffset-r-this.computedGapPixels;if(this.dragInterval>1){var p=Math.round(h/this.dragInterval)*this.dragInterval;d-=p-h,h=p}if(h<this.minSizeStart&&(h=this.minSizeStart),d<this.minSizeEnd&&(d=this.minSizeEnd),this.trackValues[this.aTrack].type==="px")this.tracks[this.aTrack]=h+"px";else if(this.trackValues[this.aTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.aTrack]="1fr";else{var T=h/this.frToPixels;this.tracks[this.aTrack]=T+"fr"}else if(this.trackValues[this.aTrack].type==="%"){var D=h/this.percentageToPixels;this.tracks[this.aTrack]=D+"%"}if(this.trackValues[this.bTrack].type==="px")this.tracks[this.bTrack]=d+"px";else if(this.trackValues[this.bTrack].type==="fr")if(this.totalFrs===1)this.tracks[this.bTrack]="1fr";else{var E=d/this.frToPixels;this.tracks[this.bTrack]=E+"fr"}else if(this.trackValues[this.bTrack].type==="%"){var z=d/this.percentageToPixels;this.tracks[this.bTrack]=z+"%"}var v=this.tracks.join(" ");this.writeStyle(this.grid,this.gridTemplateProp,v),this.onDrag(this.direction,this.track,v)};n.prototype.cleanup=function(){window.removeEventListener("mouseup",this.stopDragging),window.removeEventListener("touchend",this.stopDragging),window.removeEventListener("touchcancel",this.stopDragging),window.removeEventListener("mousemove",this.drag),window.removeEventListener("touchmove",this.drag),this.grid&&(this.grid.removeEventListener("selectstart",l),this.grid.removeEventListener("dragstart",l),this.grid.style.userSelect="",this.grid.style.webkitUserSelect="",this.grid.style.MozUserSelect="",this.grid.style.pointerEvents="",this.grid.style.cursor=""),window.document.body.style.cursor=""};n.prototype.destroy=function(t,e){t===void 0&&(t=!0),t||this.dragging===!1?(this.cleanup(),this.element&&(this.element.removeEventListener("mousedown",this.startDragging),this.element.removeEventListener("touchstart",this.startDragging)),e&&e()):(this.needsDestroy=!0,e&&(this.destroyCb=e))};var y=function(i,t,e){return t in i?i[t]:e},f=function(i,t){return function(e){if(e.track<1)throw Error("Invalid track index: "+e.track+". Track must be between two other tracks.");var r=i==="column"?t.columnMinSizes||{}:t.rowMinSizes||{},o=i==="column"?"columnMinSize":"rowMinSize";return new n(i,Object.assign({},{minSizeStart:y(r,e.track-1,s(t,o,s(t,"minSize",0))),minSizeEnd:y(r,e.track+1,s(t,o,s(t,"minSize",0)))},e),t)}},g=function(t){var e=this;this.columnGutters={},this.rowGutters={},this.options=Object.assign({},{columnGutters:t.columnGutters||[],rowGutters:t.rowGutters||[],columnMinSizes:t.columnMinSizes||{},rowMinSizes:t.rowMinSizes||{}},t),this.options.columnGutters.forEach(function(r){e.columnGutters[r.track]=f("column",e.options)(r)}),this.options.rowGutters.forEach(function(r){e.rowGutters[r.track]=f("row",e.options)(r)})};g.prototype.addColumnGutter=function(t,e){this.columnGutters[e]&&this.columnGutters[e].destroy(),this.columnGutters[e]=f("column",this.options)({element:t,track:e})};g.prototype.addRowGutter=function(t,e){this.rowGutters[e]&&this.rowGutters[e].destroy(),this.rowGutters[e]=f("row",this.options)({element:t,track:e})};g.prototype.removeColumnGutter=function(t,e){var r=this;e===void 0&&(e=!0),this.columnGutters[t]&&this.columnGutters[t].destroy(e,function(){delete r.columnGutters[t]})};g.prototype.removeRowGutter=function(t,e){var r=this;e===void 0&&(e=!0),this.rowGutters[t]&&this.rowGutters[t].destroy(e,function(){delete r.rowGutters[t]})};g.prototype.handleDragStart=function(t,e,r){e==="column"?(this.columnGutters[r]&&this.columnGutters[r].destroy(),this.columnGutters[r]=f("column",this.options)({track:r}),this.columnGutters[r].startDragging(t)):e==="row"&&(this.rowGutters[r]&&this.rowGutters[r].destroy(),this.rowGutters[r]=f("row",this.options)({track:r}),this.rowGutters[r].startDragging(t))};g.prototype.destroy=function(t){var e=this;t===void 0&&(t=!0),Object.keys(this.columnGutters).forEach(function(r){return e.columnGutters[r].destroy(t,function(){delete e.columnGutters[r]})}),Object.keys(this.rowGutters).forEach(function(r){return e.rowGutters[r].destroy(t,function(){delete e.rowGutters[r]})})};function R(i){return new g(i)}export{R as i};