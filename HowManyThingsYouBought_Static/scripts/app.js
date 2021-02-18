var model = (function() { //資料
    var item = function(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;

    };

    var data = { //項目資料利用陣列加入
        allItems: [],
        totals: 0,
    }

    var calculateTotal = function() {
        var sum = 0;
        data.allItems.forEach(function(currentVal) { //forEach尋找currentVal的值，並且加總
            sum += currentVal.value;
        });
        data.totals = sum;
    }


    return { //view 的資訊傳入model,在model產出資料，再藉由controller處理
        addItem: function(name, value) {

            var ID;

            if (data.allItems.length > 0) {

                ID = data.allItems[data.allItems.length - 1].id + 1;

            } else {

                ID = 0;

            }

            var newItem = new item(ID, name, value); //添加的新項目，項目包含ID,name,value
            data.allItems.push(newItem);
            return newItem;

        },
        test: function() {
            console.log(data);

        },
        calculateSum: function() {
            calculateTotal();
            return {
                sum: data.totals,
            }
        },
        deleteItem: function(id) {

            var ids = data.allItems.map(function(currentVal) {
                return currentVal.id;
            });

            var index = ids.indexOf(parseInt(id, 10));

            if (index >= 0) {
                data.allItems.splice(index, 1); //從Array中添加/刪除項目，回傳被刪除的項目。

            }
        },

    }

})();

var view = (function() { //畫面的顯示
    var DOMstrings = {
        name: '.name',
        value: '.value',
        btn: '.bought_btn',
        list: '.bought_list',
        sumValue: '.total_value',
        container: '.container',
        month: '.month'

    }

    var formating = function(number) {
        number = number.toFixed(2);
        number = number.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        return number;
    }


    return {
        getInfo: function() {
            return {
                name: document.querySelector(DOMstrings.name).value,
                value: parseFloat(document.querySelector(DOMstrings.value).value), //利用 parseFloat將字串轉換成數字

            };
        },

        addListItem: function(object) {

            var newHTML;

            var element = DOMstrings.list;

            var html = ' <div class="item clearfix" id=%id%><div class="item_name">%name%</div><div class="right clearfix"><div class="item_value">%value%</div><div class="delete"><button class="delete_btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            newHTML = html.replace('%id%', object.id);
            newHTML = newHTML.replace('%name%', object.name, ); //是newHTML的原因是因為上一個已經寫過為newHTML
            newHTML = newHTML.replace('%value%', formating(object.value), );

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML); //將newHTML插入.boughtlist之後
        },

        clearInput: function() {
            var inputs = document.querySelectorAll(DOMstrings.name + ',' + DOMstrings.value);

            var inputArray = Array.prototype.slice.call(inputs); //將inputs轉化為陣列原型，原本為List，無法重置內容。slice() 方法可從已有的數組中返回選定的元素。

            inputArray.forEach(function(currentVal) { //將inputArray內的值清空
                currentVal.value = '';
            });
            inputArray[0].focus(); //將輸入移動到inputArray[0]的位置

        },

        getDOMstrings: function() { //讓controller獲取DOMstrings
            return DOMstrings
        },

        displaySum: function(object) {
            document.querySelector(DOMstrings.sumValue).textContent = formating(object.sum) + '元';
        },
        deleteListItem: function(id) {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        },
        displayMonth: function() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            document.querySelector(DOMstrings.month).textContent = year + '年' + month + '月';
        },

    };
})();

var controller = (function(m, v) { //資料傳遞

    var setupEventListener = function() { //在一開始載入程序

        var DOMstrings = view.getDOMstrings();

        document.querySelector(DOMstrings.btn).addEventListener('click', addItem);
        document.addEventListener('keypress', function(event) {

            if (event.keyCode === 13 || event.which === 13) {
                addItem()
            };

        });
        document.querySelector(DOMstrings.container).addEventListener('click', deleteItem);
    };


    var deleteItem = function(event) {
        var itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        model.deleteItem(itemID);

        view.deleteListItem(itemID);
    };

    var updateTotal = function() {
        var sum = model.calculateSum(); //呼叫model內的calculateSum()
        view.displaySum(sum);
    };



    var addItem = function() {
        var input = view.getInfo();

        if (input.name !== '' && !isNaN(input.value) && input.value > 0) {

            var newItem = model.addItem(input.name, input.value); //利用controller的addItem()傳入model

            //使用view的功能
            view.addListItem(newItem);
            view.clearInput();

            updateTotal();
        }

    }

    return {
        init: function() {
            console.log('APP started');
            view.displaySum({ sum: 0 });
            view.displayMonth();
            setupEventListener();
        },

    }

})(model, view);

controller.init();