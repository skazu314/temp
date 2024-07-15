document.addEventListener('DOMContentLoaded', (event) => {
    addToggleEventListener();
    addChoiceEventListener();
    setupAddItemButton();

    var sortableList = document.getElementById('sortable-list');
    new Sortable(sortableList, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onSort: onSortEvent
    });
});

function addToggleEventListener() {
    // すべてのtoggleContainer要素を取得
    const toggleContainers = document.querySelectorAll('.toggle-container');

    // すべてのtoggleContainer要素にイベントリスナーを追加
    toggleContainers.forEach(toggleContainer => {
        toggleContainer.addEventListener('click', function () {
            // toggleContainerにonクラスをトグル
            toggleContainer.classList.toggle('on');
        });
    });
}

function addChoiceEventListener() {
    // すべてのchoiceSelector要素を取得
    const choiceSelectors = document.querySelectorAll('.choiceSelector');

    // すべてのchoiceSelector要素にイベントリスナーを追加
    choiceSelectors.forEach(choiceSelector => {
        choiceSelector.addEventListener('change', function (event) {
            // 選択されたchoiceSelector要素を取得
            const selectedChoiceSelector = event.target;
            // 親要素（.sortable-item）を取得
            const sortableItem = selectedChoiceSelector.closest('.sortable-item');

            // choiceArea要素を取得
            const choiceArea = sortableItem.querySelector('#choiceArea');

            // choiceAreaをクリア
            choiceArea.innerHTML = '';
            if (selectedChoiceSelector.value == 1 || selectedChoiceSelector.value == 2) {
                // ul要素を生成
                const ul = document.createElement('ul');
                ul.classList.add('choice-list');

                // 初期のリストアイテムを追加
                addNewChoiceInput(ul);

                choiceArea.appendChild(ul);

                // Sortableを適用
                new Sortable(ul, {
                    animation: 150,
                    ghostClass: 'sortable-ghost'
                });
            } else {
            }
        });
    });
}

function addNewChoiceInput(ul) {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `選択肢${ul.children.length + 1}`;
    input.style.flexGrow = '1';
    input.addEventListener('input', function () {
        // 最後の入力フォームに文字が入力されたら、新しい入力フォームを追加
        if (input.value.trim() !== "" && ul.lastElementChild === li) {
            addNewChoiceInput(ul);
        }
    });
    li.appendChild(input);

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn');
    removeButton.innerHTML = '<i class="bi bi-x-circle"></i>';
    removeButton.style.marginLeft = '10px';
    removeButton.addEventListener('click', function () {
        ul.removeChild(li);
    });
    li.appendChild(removeButton);

    ul.appendChild(li);
}

function setupAddItemButton() {
    const addItemButton = document.getElementById('add-item');
    addItemButton.addEventListener('click', function () {
        const sortableList = document.getElementById('sortable-list');

        // 新しいリストアイテムを作成
        const newItem = document.createElement('li');
        newItem.classList.add('sortable-item');
        newItem.innerHTML = `
            <div class="itemArea">
                <input type="text" placeholder="設問文" class="questionText">
                <input type="text" placeholder="設問補足文" class="questionSubtext">
                <div style="display: flex;">
                    <p>必須</p>
                    <div id="toggleContainer" class="toggle-container">
                        <div class="toggle-circle"></div>
                    </div>
                    <p>質問タイプ</p>
                    <select class="choiceSelector">
                        <option value="-1">選択してください</option>
                        <option value="1">単一選択</option>
                        <option value="2">複数選択</option>
                        <option value="3">自由記述</option>
                    </select>
                </div>
                <div id="choiceArea">
                </div>
            </div>
        `;

        // 新しいアイテムをsortable-listに追加
        sortableList.appendChild(newItem);

        // 新しく追加されたアイテムにもイベントリスナーを追加
        addToggleEventListener();
        addChoiceEventListener();
        addDeleteButton(); // すべてのアイテムに削除ボタンを追加
    });
}

function addDeleteButton() {
    // すべてのアイテムから削除ボタンを削除
    document.querySelectorAll('.sortable-item').forEach((sortableItem, index) => {
        const deleteButton = sortableItem.querySelector('.delete-btn');
        if (deleteButton) {
            deleteButton.remove();
        }
    });

    // 1つ目のアイテム以外に削除ボタンを追加
    const items = document.querySelectorAll('.sortable-item');
    items.forEach((sortableItem, index) => {
        if (index > 0) {
            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'delete-btn');
            removeButton.innerHTML = '<i class="bi bi-x-circle"></i>';
            removeButton.addEventListener('click', function () {
                sortableItem.remove();
            });
            sortableItem.appendChild(removeButton);
        }
    });
}

function onSortEvent(e) {
    console.log("リストが並び替えられました");
}