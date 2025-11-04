// Реальная валидация формы в реальном времени и при сабмите
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const setValidity = (input, valid) => {
    if(valid){
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }else{
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  };

  const validators = {
    name: (v)=> typeof v === 'string' && v.trim().length >= 2,
    email: (v)=> /^\S+@\S+\.\S+$/.test(v),
    phone: (v)=> v.trim()==='' || /^\+?[0-9\s\-\(\)]{10,}$/.test(v),
    goal: (v)=> true
  };

  const inputs = ['name','email','phone','goal'].map(id => document.getElementById(id));

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const fn = validators[input.name];
      if(fn){
        setValidity(input, fn(input.value));
      }
    });
    input.addEventListener('blur', () => {
      const fn = validators[input.name];
      if(fn){
        setValidity(input, fn(input.value));
      }
    });
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let allValid = true;
    inputs.forEach(input => {
      const fn = validators[input.name];
      if(fn){
        const ok = fn(input.value);
        setValidity(input, ok);
        allValid &&= ok;
      }
    });
    if(allValid){
      // Имитация отправки
      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        goal: form.goal.value.trim()
      };
      // В бою заменить на fetch('/api/submit', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
      alert('Спасибо! Мы отправили материалы на ' + payload.email);
      form.reset();
      inputs.forEach(i => { i.classList.remove('is-valid','is-invalid'); });
    }
  });
})();
