// Language Dictionary
const LANG = {
  en:{header:"Multilingual AI Step-by-Step Math Platform",aiSolver:"AI Solver 🧠",placeholder:"Enter your math question...",solveBtn:"Solve",notebook:"Notebook 📓",saveNote:"Send",topics:"Math Topics 📚",topicNotes:"Select a topic to see notes and step-by-step solutions.",graph:"Graph Plotter 📈",graphPlaceholder:"Enter equation (e.g., y=2*x+1)",plotBtn:"Plot Graph"},
  de:{header:"Mehrsprachige KI Schritt-für-Schritt Mathematik Plattform",aiSolver:"KI-Löser 🧠",placeholder:"Geben Sie Ihre Mathematikfrage ein...",solveBtn:"Lösen",notebook:"Notizbuch 📓",saveNote:"Senden",topics:"Mathematikthemen 📚",topicNotes:"Wählen Sie ein Thema, um Notizen und Schritt-für-Schritt-Lösungen zu sehen.",graph:"Graphenzeichner 📈",graphPlaceholder:"Gleichung eingeben (z.B. y=2*x+1)",plotBtn:"Graphen zeichnen"},
  ko:{header:"다국어 AI 단계별 수학 플랫폼",aiSolver:"AI 계산기 🧠",placeholder:"수학 문제를 입력하세요...",solveBtn:"풀기",notebook:"노트북 📓",saveNote:"보내기",topics:"수학 주제 📚",topicNotes:"주제를 선택하여 노트와 단계별 풀이를 확인하세요.",graph:"그래프 그리기 📈",graphPlaceholder:"방정식 입력 (예: y=2*x+1)",plotBtn:"그래프 그리기"},
  fi:{header:"Monikielinen AI vaiheittainen matematiikka-alusta",aiSolver:"AI Ratkaisija 🧠",placeholder:"Syötä matemaattinen kysymyksesi...",solveBtn:"Ratkaise",notebook:"Muistio 📓",saveNote:"Lähetä",topics:"Matematiikan aiheet 📚",topicNotes:"Valitse aihe nähdäksesi muistiinpanot ja vaiheittaiset ratkaisut.",graph:"Kaaviopiirturi 📈",graphPlaceholder:"Syötä yhtälö (esim. y=2*x+1)",plotBtn:"Piirrä kaavio"},
  sw:{header:"Jukwaa la AI la Hisabati Hatua kwa Hatua",aiSolver:"Kisuluhishi cha AI 🧠",placeholder:"Weka swali lako la hisabati...",solveBtn:"Tatua",notebook:"Daftari 📓",saveNote:"Tuma",topics:"Mada za Hisabati 📚",topicNotes:"Chagua mada ili kuona kumbuka na hatua kwa hatua za suluhisho.",graph:"Chora Grafu 📈",graphPlaceholder:"Weka mlinganyo (mfano: y=2*x+1)",plotBtn:"Chora Grafu"},
  es:{header:"Plataforma de Matemáticas AI Multilingüe Paso a Paso",aiSolver:"Solver de AI 🧠",placeholder:"Ingresa tu pregunta de matemáticas...",solveBtn:"Resolver",notebook:"Cuaderno 📓",saveNote:"Enviar",topics:"Temas de Matemáticas 📚",topicNotes:"Selecciona un tema para ver notas y soluciones paso a paso.",graph:"Graficador 📈",graphPlaceholder:"Ingresa la ecuación (ej: y=2*x+1)",plotBtn:"Graficar"}
};

// Language Switch
function changeLanguage(){
  const lang=document.getElementById("languageSelect").value;
  const texts=LANG[lang];
  document.querySelector("header p").textContent=texts.header;
  document.querySelector(".calculator h2").textContent=texts.aiSolver;
  document.getElementById("mathInput").placeholder=texts.placeholder;
  document.querySelector(".calculator button").textContent=texts.solveBtn;
  document.querySelector(".notebook h3").textContent=texts.notebook;
  document.querySelector(".notebook button").textContent=texts.saveNote;
  document.querySelector(".topics h3").textContent=texts.topics;
  document.getElementById("topicNotes").textContent=texts.topicNotes;
  document.querySelector(".graphs h3").textContent=texts.graph;
  document.getElementById("graphInput").placeholder=texts.graphPlaceholder;
  document.querySelector(".graphs button").textContent=texts.plotBtn;
}

// Calculator
function insertValue(v){document.getElementById("mathInput").value+=v;}
function clearInput(){document.getElementById("mathInput").value=""; document.getElementById("solution").innerHTML="";}
function solveMath(){
  const input=document.getElementById("mathInput").value;
  const sol=document.getElementById("solution");
  if(input.trim()===""){sol.innerHTML="Please enter a math expression."; return;}
  try{
    const expr=input.replace("^","**");
    const result=eval(expr);
    sol.innerHTML=`<p><strong>Step 1:</strong> Input: ${input}</p>
                   <p><strong>Step 2:</strong> Convert ^ to power: ${expr}</p>
                   <p><strong>Step 3:</strong> Result: ${result}</p>
                   <p><strong>Answer:</strong> ${result}</p>`;
  }catch(e){sol.innerHTML="Invalid expression. Check your input.";}
}

// Notebook
function saveNote(){
  const input=document.getElementById("notebookInput");
  const note=input.value.trim(); if(note==="") return;
  const hist=document.getElementById("notebookHistory");
  const div=document.createElement("div"); div.textContent=note;
  div.style.padding="6px"; div.style.margin="4px 0"; div.style.borderRadius="8px";
  div.style.backgroundColor="#0ea5e9"; div.style.color="#fff";
  hist.appendChild(div); hist.scrollTop=hist.scrollHeight;
  input.value="";
}

// Topics Search
function filterTopics(){
  const filter=document.getElementById("topicsSearch").value.toLowerCase();
  const ul=document.getElementById("topicsList");
  Array.from(ul.getElementsByTagName("li")).forEach(li=>{
    li.style.display=li.textContent.toLowerCase().includes(filter)?"block":"none";
  });
}

// Topics Click
document.querySelectorAll("#topicsList li").forEach(li=>{
  li.onclick=()=>{
    const notes=document.getElementById("topicNotes");
    notes.innerHTML=`<p><strong>${li.textContent} Notes:</strong></p>
                     <p>Example 1: Step-by-step solution placeholder...</p>
                     <p>Example 2: Step-by-step solution placeholder...</p>`;
  };
});

// Graphs
function plotGraph(){
  const input=document.getElementById("graphInput").value;
  const canvas=document.getElementById("graphCanvas");
  const ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(input.includes("y=")){
    const expr=input.split("=")[1];
    for(let x=0;x<canvas.width;x++){
      const mathX=(x-canvas.width/2)/30;
      let y;
      try{y=eval(expr.replace(/x/g, mathX));}catch(e){y=0;}
      ctx.fillStyle="#0ea5e9"; ctx.fillRect(x,canvas.height/2 - y*30,2,2);
    }
    ctx.strokeStyle="#ffffff"; ctx.beginPath();
    ctx.moveTo(0,canvas.height/2); ctx.lineTo(canvas.width,canvas.height/2);
    ctx.moveTo(canvas.width/2,0); ctx.lineTo(canvas.width/2,canvas.height);
    ctx.stroke();
  }
  }
