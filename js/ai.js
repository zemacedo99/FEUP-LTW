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
        chosen_hole = Math.floor(Math.random() * (row.holes_list.length - 1) + 1);
        if (row.holes_list[chosen_hole].num_seeds != 0) {
            found_play = false;
        }
    }

    return chosen_hole;
}

function aiGreedy(row) {
    for (let i = 1; i < row.holes_list.length; i++) {
        if (row.holes_list[i].num_seeds == i) {
            return i;
        }
    }

    for (let i = 1; i < row.holes_list.length; i++) {
        if (row.holes_list[i].num_seeds != 0) {
            return i;
        }
    }
}