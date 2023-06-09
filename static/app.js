const editMemo = async (event) => {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요!");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
};

const displayMemo = (memo) => {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const btn = document.createElement("button");
  li.innerText = `[id: ${memo.id}] ${memo.content}`;
  btn.innerText = "수정하기";
  btn.addEventListener("click", editMemo);
  btn.dataset.id = memo.id;
  li.appendChild(btn);
  ul.appendChild(li);
};

const readMemo = async () => {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
};

const createMemo = async (value) => {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
};

const handleSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
};

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
