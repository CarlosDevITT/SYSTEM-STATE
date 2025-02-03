const btnGenerate = document.querySelector("#generate-pdf");

btnGenerate.addEventListener("click", () => {
    //conteudo do PDF   
    const content = document.querySelector("#content")
    // config do arquivo 
    const options ={
        margin: [ 10,10,10,10],
        filename: "arquivo.pdf",
        html2canvas: {scale: 2},
        jsPDF: {unit: "mm", format: "a4", orientation: "portrait"}
    }

    // gerar pdf e baixa
     html2pdf().set(options).from(content).save();
});

const modal = document.querySelector('.modal-container')

function openModal() {
  modal.classList.add('active')
}

function closeModal() {
  modal.classList.remove('active')
}