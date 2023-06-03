import React, {useState} from 'react';
import CheckIcon from '../../../public/tick.svg';
import
{
   CheckboxContainer,
   HiddenCheckbox,
   StyledCheckbox,
   Text
} from './styles';
import Image from 'next/image';

function Checkbox({children, ...props}) {
  const [checked, setChecked] = useState(false);
  
  function handleCheckboxChange(){
     setChecked(!checked);
  }
  
  return (
     <CheckboxContainer 
        checked={checked}
        onClick={handleCheckboxChange}
     >
     <HiddenCheckbox 
        onChange={handleCheckboxChange}
        checked={checked}
     />
     <StyledCheckbox 
        checked={checked}
     >
        <Image
           alt="tick icon"
           style={{width: '15px'}}
           src={CheckIcon}
        />
     </StyledCheckbox>
     <Text checked={checked}>{children}</Text>
     </CheckboxContainer>
);
}
export default Checkbox;