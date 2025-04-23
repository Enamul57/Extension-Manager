
function extensionCard(name, description, logo, isActive, index) {
        let extension = document.createElement('div');

        extension.className = "item content-background shadow-sm shadow-gray-400 rounded-lg px-5 py-6 mb-6";

        extension.innerHTML = `
        <!--Extension Card Top-->
        <div
          class="single_extension_content space-x-4  flex justify-between items-start"
        >
          <div class="w-1/5">
            <img
              class="w-14 h-14"
              src="${logo}"
              alt="${name}"
            />
          </div>
          <div class="w-4/5">
            <h1 class="font_label dark:text font-primary">${name}</h1>
            <p class="leading-5 mt-2 text-slate-400 text-base">
              ${description}
            </p>
          </div>
        </div>
        <!--Extension Card Bottom-->
        <div class="w-full flex justify-between mt-6 relative">
          <button id="removeToggle_${index}"
            class="px-4 py-1 border border-slate-400 bg-white text-slate-800 text-base rounded-3xl"
           >
            Remove
          </button>
          <button id="statusToggle_${index}"
            class="px-4 py-1 w-[52px]  text-slate-800 text-base rounded-3xl
            before:content-[''] before:relative before:block before:w-[24px] before:h-[24px] before:rounded-full 
            transition before:duration-300 before:bg-white   absolute right-[10%] 
            ${isActive ?' bg-[#C72220] before:left-[8px]' :'bg-gray-400 before:left-[-12px]'}
          "
          >
          </button>
        </div>`;

    return extension;
}

