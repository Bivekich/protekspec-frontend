import { Link } from 'react-router-dom';

function NavigationItem({ text }) {
  const getPath = () => {
    switch(text) {
      case 'О компании':
        return '/about';
      case 'Контакты':
        return '/contact';
      case 'Гарантия':
        return '/warranty';
      case 'Бренды':
        return '/brands';
      case 'Доставка и оплата':
        return '/PaymentandDelivery';
      default:
        return '/';
    }
  };

  return (
    <Link 
      to={getPath()}
      className="hover:text-[#FAC612] transition-colors"
    >
      {text}
    </Link>
  );
}

export default NavigationItem;
