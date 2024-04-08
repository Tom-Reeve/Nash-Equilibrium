let payoff_class = document.getElementsByClassName("payoff");

let column_strat = document.getElementsByClassName("column-strat");
let row_strat_list = document.getElementsByClassName("row-strat");

function Submit() {
    let payoffs = [];
    for (let i = 0 ; i < payoff_class.length ; i++) {
        payoffs.push(payoff_class[i].value);
    }

    let row_matrix = payoffs.reduce((rows, key, index) => (index % (column_strat.length * 2) === 0 ? rows.push([key])
                                                          : rows[rows.length - 1].push(key)) && rows, []);
    let col_matrix = row_matrix[0].map((col, i) => row_matrix.map(row => row[i]));

    //row-matrx = [[1, 2, 3, 4, 5, 6] , [7, 8, 9, 10, 11, 12]];
    //col-matrix = [[1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12]];

    let row_strat = []; //gives all responses of p2 to each p1 strategy [[2, 4, 6], [8, 10, 12]];
    for (let i = 0 ; i < row_matrix.length ; i++) { //2
        let row_arr = [];
        for (let j = 1 ; j < row_matrix[i].length ; j += 2) { //6
            row_arr.push(row_matrix[i][j]);
        }
        row_strat.push(row_arr);
    }

    let col_strat = []; //gives all responses of p1 to each p2 strategy [[1, 7], [3, 9], [5, 11]];
    for (let i = 0 ; i < col_matrix.length ; i += 2) {
        col_strat.push(col_matrix[i]);
    }

    let row_best_response = [];
    for (let i = 0 ; i < col_strat.length ; i++) {
        let strat_payoffs = col_strat[i];

        strat_payoffs.forEach((element) => parseInt(element));

        let best_response_value = Math.max(...strat_payoffs);
        let best_response_name_index = strat_payoffs.indexOf(best_response_value.toString());
        let best_response_name = row_strat_list[best_response_name_index].value;

        row_best_response.push(best_response_name);
    }

    let col_best_response = [];
    for (let i = 0 ; i < row_strat.length ; i++) {
        let strat_payoffs = row_strat[i];

        strat_payoffs.forEach((element) => parseInt(element));

        let best_response_value = Math.max(...strat_payoffs);
        let best_response_name_index = strat_payoffs.indexOf(best_response_value.toString());
        let best_response_name = column_strat[best_response_name_index].value;

        col_best_response.push(best_response_name);
    }
    
    let col_strat_names = [];
    for (let i = 0 ; i < column_strat.length ; i++) {
        col_strat_names.push(column_strat[i].value);
    }
    let row_strat_names = [];
    for (let i = 0 ; i < row_strat.length ; i++) {
        row_strat_names.push(row_strat_list[i].value);
    }

    let best_response_matrix = [];
    for (let i = 0 ; i < row_strat_names.length ; i++) {
        let row_index = row_strat_names.indexOf(row_best_response[i]); //which row strat is the best response
        let matrix_index = row_index * column_strat.length + i;

        best_response_matrix.push(matrix_index);
    }
    for (let i = 0 ; i < column_strat.length ; i++) {
        let col_index = col_strat_names.indexOf(col_best_response[i]);
        let matrix_index = (i * row_strat_list.length) + col_index;

        best_response_matrix.push(matrix_index);
    }

    let counts = {};
    for (const num of best_response_matrix) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    let most_common_count_value = Math.max(...Object.values(counts));
    let most_common_count_key = [];
    for (let i = 0 ; i < Object.keys(counts).length ; i++) {
        if (Object.values(counts)[i] === most_common_count_value) {
            most_common_count_key.push(Object.keys(counts)[i]);
        }
    }

    let equilibria = [];
    for (let i = 0 ; i < most_common_count_key.length ; i++) {
        let row_index = Math.floor(most_common_count_key[i] / col_strat.length);
        let col_index = most_common_count_key[i] % col_strat.length;

        equilibria.push([row_strat_names[row_index] + " , " + col_strat_names[col_index]]);
    }

    document.getElementById("equilibrium-wrapper").innerHTML = equilibria;
}

















