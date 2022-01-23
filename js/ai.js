function aiPlay(ai_level, row) {
    let chosen_hole;

    if (ai_level == 1) {
        chosen_hole = aiBasic(row);
    }
    else if (ai_level == 2) {
        chosen_hole = aiGreedy(row)
    }

    return chosen_hole;
}

function aiBasic(row) {
    let chosen_hole;
    let found_play = true;

    while (found_play) {
        chosen_hole = Math.ceil(Math.random() * (row.holes_list.length));
        console.log("chosen hole is " + chosen_hole);
        console.log("in ai basic num_Seeds = " + row.holes_list[chosen_hole].num_seeds);
        if (row.holes_list[chosen_hole].num_seeds != 0) {
            found_play = false;
        }
    }

    return chosen_hole;
}

function aiGreedy(row) {
    //for loop que escolhe um hole que tenha o id igual ao número de seed, para assim deixar uma semaente no storage e poder jogar outra vez
    //
    for (let i = 1; i < row.holes_list.length; i++) {
        if (row.holes_list[i].num_seeds == i) {
            console.log("suggestion in smart is " + i);
            return i;
        }
    }
    //nao descrobrindo uma jogada no primeiro for loop
    //
    //for loop para descrobrir o hole mais próximo do storage com sementes e fazer a jogada nesse hole
    for (let i = 1; i < row.holes_list.length; i++) {
        if (row.holes_list[i].num_seeds != 0) {
            console.log("suggestion in smart random is " + i);
            return i;
        }
    }
}