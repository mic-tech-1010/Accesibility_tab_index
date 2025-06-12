class NavigationBar {
  constructor(domNode){
    this.rootNode = domNode;
    console.log(this.rootNode)
  }
}

window.addEventListener('load', function() {
    const nav = document.querySelector('.nav');
    new NavigationBar(nav)
})
