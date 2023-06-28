import React from 'react';

const Navigation = ({ onRouteChange, route }) => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          { route === 'home'
            ?<p onClick={() => onRouteChange('signin')} className='f3 dim black underline pa3 pointer'>Sign Out</p>
            :<div className='flex'> 
            <p onClick={() => onRouteChange('signin')} className='f3 dim black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 dim black underline pa3 pointer'>Register</p>
            </div>
            
          }
        </nav>
    )
}

export default Navigation;