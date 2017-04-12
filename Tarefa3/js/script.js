var dataUrl = "dados/menu.json",
    menuHtml = "snippets/menu-snippet.html",
    sectionHtml = "snippets/section-snippet.html";
    
// função facilitadora para inserir HTML em um elemento
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

// substitui propriedade {{propName}} dentro de um 
// 'template', e substitui por seu propValue
function inserePropriedade(template, propName, propValue) {
  // criar {{propName}}
  // trocar (replace), dentro de template, {{propName}} por propValue
  // retornar o template alterado
  var propriedade = "{{" + propName + "}}";
  // substitui todas as ocorrências de propriedade por propValue
  // em template
  template = template.replace(new RegExp(propriedade, "g"),
              propValue);
  return template;
}

// constroi a pagina, com os dados recebidos por parametro
function constroiPagina(dados) {
  var htmlMenu = ''; // string que vai conter todo o HTML
  var htmlSection = '';
  // construimos os itens agora
    $ajaxUtils.sendGetRequest(menuHtml, function(menuHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var menu = menuHtml,
          titulo = dados[i].titulo

      menu = inserePropriedade(menu, "titulo", titulo);

      htmlMenu += menu;
    }
    htmlMenu += '';
    insereHtml("#menuJSON", htmlMenu);
    }, false);
    
    $ajaxUtils.sendGetRequest(sectionHtml, function(sectionHtml) {
        for (var i = 0, max = dados.length; i < max; i++) {
          var section = sectionHtml,
              titulo = dados[i].titulo,
              conteudo = dados[i].Conteudo

          section = inserePropriedade(section,"titulo",titulo);
          section = inserePropriedade(section,"conteudo",conteudo);

          htmlSection += section
        }
        htmlSection += '';
          insereHtml("#content", htmlSection);
      }, false);// não é um JSON
}
// vamos construir o sendGetRequest:
// definir a URL (dataUrl)
// e o metodo constroiPagina
$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);

$(document).on('click', 'a', function(event){
                    event.preventDefault();

                    $('html, body').animate({
                        scrollTop: $( $.attr(this, 'href') ).offset().top
                    }, 500);
                });