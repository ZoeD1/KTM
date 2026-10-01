// Update these four values when the company's contact information is ready.
const companyContact = {
  phone: '0989127522310',
  email: 'kooshatavanmotor@gmail.com',
  address: 'ساوه یل آباد',
  hours: '7-8pm'
};
for (const [key, value] of Object.entries(companyContact)) {
  const element = document.querySelector(`[data-contact="${key}"]`);
  if (!element || !value.trim()) continue;
  element.textContent = value;
  if (key === 'phone' || key === 'email') {
    const link = document.createElement('a');
    link.textContent = value;
    link.href = key === 'phone' ? `tel:${value.replace(/[^+0-9]/g, '')}` : `mailto:${value}`;
    link.dir = 'ltr';
    element.replaceChildren(link);
  }
}
