
document.addEventListener('DOMContentLoaded', async function () {
    let filteredType = 'all';
    let filteredLists = [];

    let all = document.getElementById('allStatus').classList;
    let active = document.getElementById('active').classList;
    let inactive = document.getElementById('inactive').classList;

    //append lists
    const extension_container = document.getElementById('extensionLists');

    if (!extension_container) return;

    const response = await fetch('./data.json');
    let lists = await response.json();

    function render() {
        extension_container.innerHTML = "";

        if (filteredType == 'all') {
            filteredLists = lists;
        } 
        if (filteredType == 'active') {
            filteredLists = lists.filter((list) => list.isActive);
        } 
        if (filteredType == 'inactive') {
            filteredLists = lists.filter((list) => !list.isActive);
        }

        //append lists 
        filteredLists.forEach((list, index) => {
            let realIndex = lists.indexOf(list);
            let extension = extensionCard(list.name, list.description, list.logo, list.isActive, realIndex);
            extension_container.appendChild(extension);
        });

    }

    // Initial Render
    render();
    isAll();
    //append  animation
    extension_container.addEventListener('click', function (e) {
        if (e.target && e.target.id.startsWith('statusToggle_')) {
            //toggle isActive 
            let index = e.target.id.split('_')[1];
            lists[index].isActive = !lists[index].isActive;
            //play with the toggle button
            const targetClass = e.target.classList;
            if (targetClass.contains("before:left-[8px]")) {
                targetClass.remove('before:left-[8px]');
                targetClass.remove("bg-[#C72220]");
                targetClass.add("bg-gray-400");
                targetClass.add('before:left-[-12px]')
            } else {
                targetClass.remove('bg-gray-400');
                targetClass.remove('before:left-[-12px]');
                targetClass.add("before:left-[8px]");
                targetClass.add("bg-[#C72220]");
            }
            render();
        }

       //remove
       if (e.target && e.target.id.startsWith('removeToggle_')) {
        //toggle isActive 
        let index = e.target.id.split('_')[1];
        lists.splice(index, 1);
        extension_container.innerHTML = "";
        filteredLists.forEach((list, index) => {
            let realIndex = lists.indexOf(list);
            let extension = extensionCard(list.name, list.description, list.logo, list.isActive, realIndex);
            extension_container.appendChild(extension);
        });
        render();
    }
    });

    function isAll(){
        all.remove('text-slate-600','bg-white');
        all.add('bg-[#C72220]','text-white');
       
        if(active.contains('bg-[#C72220]','text-white')){
            active.remove('bg-[#C72220]','text-white');
            active.add('text-slate-600','bg-white');
        }
        if(inactive.contains('bg-[#C72220]','text-white')){
            inactive.remove('bg-[#C72220]','text-white');
            inactive.add('text-slate-600','bg-white');

        }
    }
    function isActive(){
        active.remove('text-slate-600','bg-white');
        active.add('bg-[#C72220]','text-white');
        if(all.contains('bg-[#C72220]','text-white')){
            all.remove('bg-[#C72220]','text-white');
            all.add('text-slate-600','bg-white');
        }
        if(inactive.contains('bg-[#C72220]','text-white')){
            inactive.remove('bg-[#C72220]','text-white');
            inactive.add('text-slate-600','bg-white');
        }
    }
    function isInactive(){
            inactive.remove('text-slate-600','bg-white');
            inactive.add('bg-[#C72220]','text-white');
            if(all.contains('bg-[#C72220]','text-white')){
                all.remove('bg-[#C72220]','text-white');
                all.add('text-slate-600','bg-white');

            }
            if(active.contains('bg-[#C72220]','text-white')){
                active.remove('bg-[#C72220]','text-white');
                active.add('text-slate-600','bg-white');
            }
    }
    // filter buttons
    document.getElementById('active').addEventListener('click', function () {
        filteredType = 'active';
        isActive();
        render();
    });
    document.getElementById('inactive').addEventListener('click', function () {
        filteredType = 'inactive';
        isInactive();
        render();
    });
    document.getElementById('allStatus').addEventListener('click', function () {
        filteredType = 'all';
        isAll();
        render();
    });
    

    //dark theme

    const app = document.documentElement;
      const toggleTheme = document.getElementById('dark_theme');

      function getTheme() {
        if (localStorage.getItem('theme') === 'dark') {
          app.classList.add('dark');
        }
      }

      toggleTheme.addEventListener('click', function () {
        app.classList.toggle('dark');
        if(app.classList.contains('dark')){
            this.src  = "assets/images/icon-sun.svg";
            document.querySelector('.mode').classList.add('bg-[#1F2535]','rounded-md','border','border-slate-500');
        }else{
            this.src  = "assets/images/icon-moon.svg";
            document.querySelector('.mode').classList.remove('bg-[#1F2535]','bg-[#1F2535]','rounded-md','border','border-slate-500');
        }
        localStorage.setItem('theme', app.classList.contains('dark') ? 'dark' : 'light');
      });

      getTheme();

});