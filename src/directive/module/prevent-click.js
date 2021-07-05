  
  export default {
    inserted: (el, binding) => {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            console.log("执行了")
            el.disabled = true
            // 传入绑定值就使用，默认3000毫秒内不可重复点击
            setTimeout(() => el.disabled = false, binding.value || 3000)
          }
        })
      }
  }