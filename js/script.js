$(document).ready(function(){
    //maze size/dimention
    var maze_height = 1200
    var maze_width = 1200
    var player_dir = 3

    //player starting position
    var playerX = 40
    var playerY = 0
    var beamY = playerY
    var beamX = playerX

    //move function for player
    function move_player(dx, dy) {
        var newX = playerX + dx
        var newY = playerY + dy
        beamY = playerY
        beamX = playerX
        //verify new position is inside of the maze walls
        if(newX >= 0 && newX < maze_width && newY >= 0 && newY < maze_height){
            ////check to see if the new position is a wall or not
            if(!$('#maze').find('.wall').is('[style="top: ' + newY + 'px; left: ' + newX + 'px;"]')){
                playerX = newX
                playerY = newY
                $('#player').css({top: playerY + 'px', left: playerX + 'px'})
            }
            //Check to see if the player reaches the end
            if(playerX === 480 && playerY === 220){
                alert("congradulations you made it through the first level")
                $('#end').css('top', '')
            }
        }
    }

    //single beam
    beam_count = 0
    var hit_walls = []
    function shoot_beam() {
        beam_count++
        if(player_dir === 1){
            $("#player").css('transform', 'rotate(180deg)')
            beamX = playerX-40
            if(beam_count < 2){
                $('#player').append('<div class="s_beam" id="s_beam" style="top: ' + beamY + 'px; left: ' + beamX + 'px; background-color: red; width: 60px; height: 20px; z-index: 2;"></div>');
            }else if(beam_count == 2){
                $('#s_beam').remove()
                beam_count--
            }
    
            for (let index = 0; index < wall_coordinates.length; index++) {
                if((playerY === wall_coordinates[index].top) && !hit_walls.includes(index)){
                    if(wall_coordinates[index].left >= beamX){
                        if(wall_coordinates[index].left < playerX){
                            $('#maze').append('<div class="wall" id="wall' + index + '" style="top: ' + wall_coordinates[index].top + 'px; left: ' + wall_coordinates[index].left + 'px;"></div>')
                            $('#wall' + index).css('visibility', 'visible')
                            hit_walls.push(index)
                        }
                    }
                }
            }
        }
        if(player_dir === 2){
            beamY = playerY-40
            if(beam_count < 2){
                $("#player").css('transform', 'rotate(180deg)')
                $('#player').append('<div class="s_beam" id="s_beam" style="top: ' + beamY + 'px; left: ' + beamX + 'px; background-color: red; width: 20px; height: 60px; z-index: 2;"></div>');
            }else if(beam_count == 2){
                $('#s_beam').remove()
                beam_count--
            }
    
            for (let index = 0; index < wall_coordinates.length; index++) {
                if((playerX === wall_coordinates[index].left) && !hit_walls.includes(index)){
                    if(wall_coordinates[index].top >= beamY){
                        if(wall_coordinates[index].top < playerY){
                            $('#maze').append('<div class="wall" id="wall' + index + '" style="top: ' + wall_coordinates[index].top + 'px; left: ' + wall_coordinates[index].left + 'px;"></div>')
                            $('#wall' + index).css('visibility', 'visible')
                            hit_walls.push(index)
                        }
                    }
                }
            }
        }
        if(player_dir === 3){
            $("#player").css('transform', 'rotate(0deg)')
            beamX = playerX+40
            if(beam_count < 2){
                $('#player').append('<div class="s_beam" id="s_beam" style="top: ' + beamY + 'px; left: ' + beamX + 'px; background-color: red; width: 60px; height: 20px; z-index: 2;"></div>')
            }else if(beam_count == 2){
                $('#s_beam').remove()
                beam_count--
            }
    
            for (let index = 0; index < wall_coordinates.length; index++) {
                if((playerY === wall_coordinates[index].top) && !hit_walls.includes(index)){
                    if(wall_coordinates[index].left <= beamX){
                        if(wall_coordinates[index].left > playerX){
                            $('#maze').append('<div class="wall" id="wall' + index + '" style="top: ' + wall_coordinates[index].top + 'px; left: ' + wall_coordinates[index].left + 'px;"></div>')
                            $('#wall' + index).css('visibility', 'visible')
                            hit_walls.push(index)
                        }
                    }
                }
            }
        }
        if(player_dir === 4){
            $("#player").css('transform', 'rotate(0deg)')
            beamY = playerY+40
            if(beam_count < 2){
                $('#player').append('<div class="s_beam" id="s_beam" style="top: ' + beamY + 'px; left: ' + beamX + 'px; background-color: red; width: 20px; height: 60px; z-index: 2;"></div>')
            }else if(beam_count == 2){
                $('#s_beam').remove()
                beam_count--
            }
    
            for (let index = 0; index < wall_coordinates.length; index++) {
                if((playerX === wall_coordinates[index].left) && !hit_walls.includes(index)){
                    if(wall_coordinates[index].top <= beamY){
                        if(wall_coordinates[index].top > playerY){
                            $('#maze').append('<div class="wall" id="wall' + index + '" style="top: ' + wall_coordinates[index].top + 'px; left: ' + wall_coordinates[index].left + 'px;"></div>')
                            $('#wall' + index).css('visibility', 'visible')
                            hit_walls.push(index)
                        }
                    }
                }
            }
        }
    }
    function delete_beam() {
        $('#s_beam').remove()
        beam_count = 0
    }

    //keypress event listeners
    $(document).keydown(function(e){
        switch(e.which){
            case 65: //a key
                move_player(-20, 0)
                delete_beam()
                player_dir = 1
                break;
            case 87: //w key
                move_player(0, -20)
                delete_beam()
                player_dir = 2
                break;
            case 68: //d key
                move_player(20, 0)
                delete_beam()
                player_dir = 3
                break;
            case 83: //s key
                move_player(0, 20)
                delete_beam()
                player_dir = 4
                break;
            case 81: //number one
                shoot_beam()
                break;
        }
    })
    $(document).keyup(function(e){
        switch(e.which){
            case 81:
                delete_beam()
        }
    })

    //create maze walls
    var wall_coordinates = [
        //borders
        {top:0, left:480},
        {top:20, left:480},
        {top:40, left:480},
        {top:60, left:480},
        {top:80, left:480},
        {top:100, left:480},
        {top:120, left:480},
        {top:140, left:480},
        {top:160, left:480},
        {top:180, left:480},
        {top:200, left:480},
        {top:240, left:480},
        {top:260, left:480},
        {top:280, left:480},
        {top:300, left:480},
        {top:320, left:480},
        {top:340, left:480},
        {top:360, left:480},
        {top:380, left:480},
        {top:400, left:480},
        {top:420, left:480},
        {top:440, left:480},
        {top:460, left:480},
        {top:480, left:480},
        {top:480, left:460},
        {top:480, left:440},
        {top:480, left:420},
        {top:480, left:400},
        {top:480, left:380},
        {top:480, left:360},
        {top:480, left:340},
        {top:480, left:320},
        {top:480, left:300},
        {top:480, left:280},
        {top:480, left:260},
        {top:480, left:240},
        {top:480, left:220},
        {top:480, left:200},
        {top:480, left:180},
        {top:480, left:180},
        {top:480, left:160},
        {top:480, left:140},
        {top:480, left:120},
        {top:480, left:100},
        {top:480, left:80},
        {top:480, left:60},
        {top:480, left:40},
        {top:480, left:20},
        {top:480, left:0},
        {top:480, left:500},
        {top:480, left:520},
        {top:480, left:540},
        {top:480, left:560},
        {top:480, left:580},
        {top:480, left:600},
        {top:480, left:620},
        {top:480, left:640},
        {top:480, left:660},
        {top:480, left:680},
        {top:480, left:700},
        {top:480, left:720},
        {top:480, left:740},
        {top:480, left:760}, 
        {top:480, left:780}, 
        {top:480, left:800},
        {top:480, left:820},
        {top:480, left:840},
        {top:480, left:860},
        {top:480, left:880},
        {top:480, left:900},
        {top:480, left:920},
        {top:480, left:940},
        {top:480, left:980},
        {top:480, left:1000},
        {top:480, left:1020},
        {top:480, left:1040},
        {top:480, left:1060},
        {top:480, left:1080},
        {top:480, left:1100},
        {top:480, left:1120},
        {top:480, left:1140},
        {top:480, left:1160},
        {top:480, left:1180},

        //map
        //first
        //row 1
        {top:0, left:0},
        {top:0, left:20},
        {top:0, left:60},
        {top:0, left:220},
        {top:0, left:260},
        {top:0, left:300},

        //row 2
        {top:20, left: 20},
        {top:20, left:60},
        {top:20, left:80},
        {top:20, left:100},
        {top:20, left:140},
        {top:20, left:160},
        {top:20, left:180},
        {top:20, left:200},
        {top:20, left:220},
        {top:20, left:260},
        {top:20, left:300},
        {top:20, left:340},
        {top:20, left:360},
        {top:20, left:380},
        {top:20, left:400},
        {top:20, left:420},
        {top:20, left:440},
        //row 3
        {top:40, left:20},
        {top:40, left:180},
        {top:40, left:260},
        {top:40, left:300},
        {top:40, left:340},
        {top:40, left:440},
        //row 4
        {top:60, left:20},
        {top:60, left:40},
        {top:60, left:80},
        {top:60, left:100},
        {top:60, left:120},
        {top:60, left:140},
        {top:60, left:180},
        {top:60, left:220},
        {top:60, left:260},
        {top:60, left:300},
        {top:60, left:440},
        //row 5
        {top:80, left:80},
        {top:80, left:140},
        {top:80, left:180},
        {top:80, left:220},
        {top:80, left:340},
        {top:80, left:360},
        {top:80, left:380},
        {top:80, left:400},
        {top:80, left:440},
        //row 6
        {top:100, left:0},
        {top:100, left:20},
        {top:100, left:40},
        {top:100, left:80},
        {top:100, left:140},
        {top:100, left:180},
        {top:100, left:220},
        {top:100, left:240},
        {top:100, left:260},
        {top:100, left:280},
        {top:100, left:300},
        {top:100, left:340},
        {top:100, left:360},
        {top:100, left:380},
        {top:100, left:400},
        {top:100, left:440},
        {top:100, left:460},
        //row 7
        {top:120, left:40},
        {top:120, left:140},
        {top:120, left:300},
        {top:120, left:360},
        //row 8
        {top:140, left:40},
        {top:140, left:140},
        {top:140, left:180},
        {top:140, left:200},
        {top:140, left:220},
        {top:140, left:240},
        {top:140, left:260},
        {top:140, left:280},
        {top:140, left:300},
        {top:140, left:360},
        {top:140, left:400},
        {top:140, left:420},
        {top:140, left:440},
        //row 9
        {top:160, left:40},
        {top:160, left:140},
        {top:160, left:180},
        {top:160, left:200},
        {top:160, left:220},
        {top:160, left:240},
        {top:160, left:240},
        {top:160, left:360},
        {top:160, left:400},
        {top:160, left:440},
        //row 10
        {top:180, left:140},
        {top:180, left:360},
        {top:180, left:400},
        {top:180, left:440},
        //row11
        {top:200, left:40},
        {top:200, left:80},
        {top:200, left:100},
        {top:200, left:120},
        {top:200, left:140},
        {top:200, left:160},
        {top:200, left:180},
        {top:200, left:200},
        {top:200, left:240},
        {top:200, left:340},
        {top:200, left:360},
        {top:200, left:380},
        {top:200, left:400},
        {top:200, left:420},
        {top:200, left:440},
        {top:200, left:460},
        //row 12
        {top:220, left:40},
        {top:220, left:200},
        {top:220, left:240},
        {top:220, left:260},
        {top:220, left:280},
        {top:220, left:300},
        {top:220, left:320},
        {top:220, left:340},
        //row 13
        {top:240, left:40},
        {top:240, left:200},
        {top:240, left:380},
        {top:240, left:400},
        {top:240, left:420},
        {top:240, left:440},
        {top:240, left:460},
        //row 14
        {top:260, left:20},
        {top:260, left:40},
        {top:260, left:60},
        {top:260, left:80}, 
        {top:260, left:120},       
        {top:260, left:160},
        {top:260, left:180},
        {top:260, left:200},
        {top:260, left:280},
        {top:260, left:300},
        {top:260, left:320},
        {top:260, left:340},
        {top:260, left:360},
        {top:260, left:380},
        //row 15
        {top:280, left:20},
        {top:280, left:120},
        {top:280, left:160},
        {top:280, left:280},
        //row 16
        {top:300, left:20},
        {top:300, left:80},
        {top:300, left:120},
        {top:300, left:160},
        {top:300, left:280},
        //row 17
        {top:320, left:20},
        {top:320, left:80},
        {top:320, left:120},
        {top:320, left:160},
        {top:320, left:180},
        {top:320, left:200},
        {top:320, left:220},
        {top:320, left:240},
        {top:320, left:260},
        {top:320, left:280},
        {top:320, left:300},
        {top:320, left:320},
        {top:320, left:340},
        {top:320, left:360},
        {top:320, left:380},
        {top:320, left:400},
        {top:320, left:420},
        {top:320, left:440},
        //row 18
        {top:340, left:20},
        {top:340, left:80},
        {top:340, left:120},
        {top:340, left:440},
        //row 19
        {top:360, left:20},
        {top:360, left:80},
        {top:360, left:120},
        {top:360, left:440},
        //row 20
        {top:380, left:20},
        {top:380, left:80},
        {top:380, left:120},
        {top:380, left:440},
        //row 21
        {top:400, left:20},
        {top:400, left:80},
        {top:400, left:120},
        {top:400, left:440},
        //row 22
        {top:420, left:20},
        {top:420, left:80},
        {top:420, left:120},
        {top:420, left:140},
        {top:420, left:160},
        {top:420, left:180},
        {top:420, left:200},
        {top:420, left:220},
        {top:420, left:240},
        {top:420, left:260},
        {top:420, left:280},
        {top:420, left:300},
        {top:420, left:320},
        {top:420, left:340},
        {top:420, left:360},
        {top:420, left:380},
        {top:420, left:400},
        {top:420, left:420},
        {top:420, left:440},
        //row 23
        {top:440, left:20},
        {top:440, left:40},
        {top:440, left:60},
        {top:440, left:80},
        

        //second

        //row 1
        {top:0, left:680},
        //row 2
        {top:20, left:520},
        {top:20, left:560},
        {top:20, left:580},
        {top:20, left:600},
        {top:20, left:620},
        {top:20, left:640},
        {top:20, left:660},
        {top:20, left:680},
        {top:20, left:720},
        {top:20, left:740},
        {top:20, left:760},
        {top:20, left:780},
        {top:20, left:820},
        {top:20, left:840},
        {top:20, left:860},
        {top:20, left:900},
        {top:20, left:920},
        {top:20, left:960},
        {top:20, left:980},
        {top:20, left:1000},
        {top:20, left:1020},
        {top:20, left:1040},
        {top:20, left:1060},
        {top:20, left:1080},
        {top:20, left:1100},
        {top:20, left:1120},
        {top:20, left:1140},
        {top:20, left:1160},
        //row 3
        {top:40, left:520},
        {top:40, left:720},
        {top:40, left:780},
        {top:40, left:820},
        {top:40, left:860},
        {top:40, left:900},
        {top:40, left:920},
        {top:40, left:960},
        {top:40, left:1160},
        //row 4
        {top:60, left:520},
        {top:60, left:560},
        {top:60, left:580},
        {top:60, left:600},
        {top:60, left:620},
        {top:60, left:640},
        {top:60, left:660},
        {top:60, left:680},
        {top:60, left:700},
        {top:60, left:720},
        {top:60, left:780},
        {top:60, left:820},
        {top:60, left:860},
        {top:60, left:900},
        {top:60, left:920},
        {top:60, left:960},
        {top:60, left:1160},
        //row 5
        {top:80, left:520},
        {top:80, left:560},
        {top:80, left:620},
        {top:80, left:780},
        {top:80, left:820},
        {top:80, left:840},
        {top:80, left:860},
        {top:80, left:900},
        {top:80, left:920},
        {top:80, left:960},
        {top:80, left:1160},

        //row 6
        {top:100, left:520},
        {top:100, left:560},
        {top:100, left:600},
        {top:100, left:620},
        {top:100, left:900},
        {top:100, left:920},
        {top:100, left:960},
        {top:100, left:1160},
        //row 7 
        {top:120, left:520},
        {top:120, left:600},
        {top:120, left:620},
        {top:120, left:640},
        {top:120, left:720},
        {top:120, left:760},
        {top:120, left:780},
        {top:120, left:820},
        {top:120, left:840},
        {top:120, left:860},
        {top:120, left:880},
        {top:120, left:900},
        {top:120, left:920},
        {top:120, left:960},
        {top:120, left:1160},
        //row 8
        {top:140, left:520},
        {top:140, left:540},
        {top:140, left:560},
        {top:140, left:600},
        {top:140, left:720},
        {top:140, left:760},
        {top:140, left:780},
        {top:140, left:820},
        {top:140, left:840},
        {top:140, left:860},
        {top:140, left:880},
        {top:140, left:900},
        {top:140, left:920},
        {top:140, left:960},
        {top:140, left:1160},
        //row 9
        {top:160, left:560},
        {top:160, left:600},
        {top:160, left:620},
        {top:160, left:640},
        {top:160, left:720},
        {top:160, left:760},
        {top:160, left:780},
        {top:160, left:1160},
        //row 10
        {top:180, left:560},
        {top:180, left:600},
        {top:180, left:640},
        {top:180, left:720},
        {top:180, left:760},
        {top:180, left:780},
        {top:180, left:800},
        {top:180, left:820},
        {top:180, left:860},
        {top:180, left:880},
        {top:180, left:900},
        {top:180, left:920},
        {top:180, left:940},
        {top:180, left:960},
        {top:180, left:980},
        {top:180, left:1000},
        {top:180, left:1140},
        {top:180, left:1160},
        //row 11
        {top:200, left:500},
        {top:200, left:520},
        {top:200, left:540},
        {top:200, left:560},
        {top:200, left:600},
        {top:200, left:640},
        {top:200, left:720},
        {top:200, left:760},
        {top:200, left:960},
        {top:200, left:1000},
        {top:200, left:1140},
        {top:200, left:1160},
        //row 12
        {top:220, left:640},
        {top:220, left:720},
        {top:220, left:760},
        {top:220, left:960},
        {top:220, left:1000},
        {top:220, left:1020},
        {top:220, left:1040},
        {top:220, left:1060},
        {top:220, left:1080},
        {top:220, left:1100},
        {top:220, left:1120},
        {top:220, left:1140},
        {top:220, left:1160},
        //row 13
        {top:240, left:500},
        {top:240, left:520},
        {top:240, left:540},
        {top:240, left:560},
        {top:240, left:580},
        {top:240, left:600},
        {top:240, left:620},
        {top:240, left:640},
        {top:240, left:720},
        {top:240, left:760},
        {top:240, left:960},
        {top:240, left:1140},
        {top:240, left:1160},
        //row 14
        {top:260, left:600},
        {top:260, left:720},
        {top:260, left:760},
        {top:260, left:960},
        {top:260, left:980},
        {top:260, left:1000},
        {top:260, left:1020},
        {top:260, left:1040},
        {top:260, left:1060},
        {top:260, left:1080},
        {top:260, left:1100},
        {top:260, left:1140},
        {top:260, left:1160},
        //row 15
        {top:280, left:600},
        {top:280, left:720},
        {top:280, left:760},
        {top:280, left:780},
        {top:280, left:800},
        {top:280, left:820},
        {top:280, left:840},
        {top:280, left:860},
        {top:280, left:880},
        {top:280, left:900},
        {top:280, left:920},
        {top:280, left:940},
        {top:280, left:960},
        {top:280, left:980},
        {top:280, left:1000},
        {top:280, left:1020},
        {top:280, left:1100},
        {top:280, left:1140},
        {top:280, left:1160},
        //row 16
        {top:300, left:720},
        {top:300, left:1020},
        {top:300, left:1040},
        {top:300, left:1060},
        {top:300, left:1080},
        {top:300, left:1140},
        {top:300, left:1100},
        {top:300, left:1160},
        //row 17
        {top:320, left:500},
        {top:320, left:520},
        {top:320, left:540},
        {top:320, left:560},
        {top:320, left:580},
        {top:320, left:600},
        {top:320, left:720},
        {top:320, left:760},
        {top:320, left:780},
        {top:320, left:800},
        {top:320, left:820},
        {top:320, left:840},
        {top:320, left:860},
        {top:320, left:880},
        {top:320, left:900},
        {top:320, left:920},
        {top:320, left:940},
        {top:320, left:960},
        {top:320, left:980},
        {top:320, left:1020},
        //row 18
        {top:340, left:760},
        {top:340, left:980},
        {top:340, left:1020},
        {top:340, left:1040},
        {top:340, left:1060},
        {top:340, left:1080},
        {top:340, left:1100},
        {top:340, left:1120},
        {top:340, left:1140},
        {top:340, left:1160},
        //row 19
        {top:360, left:720},
        {top:360, left:760},
        {top:360, left:980},
        {top:360, left:1020},
        {top:360, left:1160},
        //row 20
        {top:380, left:720},
        {top:380, left:700},
        {top:380, left:680},
        {top:380, left:660},
        {top:380, left:640},
        {top:380, left:620},
        {top:380, left:600},
        {top:380, left:580},
        {top:380, left:560},
        {top:380, left:540},
        {top:380, left:520},
        {top:380, left:500},
        {top:380, left:940},
        {top:380, left:960},
        {top:380, left:980},
        {top:380, left:1020},
        {top:380, left:1160},
        //row 21
        {top:400, left:940},
        {top:400, left:1020},
        {top:400, left:1160},
        //row 22
        {top:420, left:940},
        {top:420, left:980},
        {top:420, left:1020},
        {top:420, left:1160},
        //row 23
        {top:440, left:940},
        {top:440, left:980},
        {top:440, left:1000},
        {top:440, left:1020},
        {top:440, left:1040},
        {top:440, left:1060},
        {top:440, left:1080},
        {top:440, left:1100},
        {top:440, left:1120},
        {top:440, left:1140},
        {top:440, left:1160},
        //row 24
        {top:460, left:940},
        {top:460, left:980}
    ]

    for(var i = 0; i < wall_coordinates.length; i++){
        $('#maze').append('<div class="wall" id="wall' + i + '" style="top: ' + wall_coordinates[i].top + 'px; left: ' + wall_coordinates[i].left + 'px;"></div>')
    }

    //create the player and append it to the board
    $('#maze').append('<div class="player" id="player" style="top: ' + playerY + 'px; left: ' + playerX + 'px;"></div>')
})