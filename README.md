# @natenorrish/react-bounds
A React component to simplify working with multiple screen resolutions / devices. Child components are only rendered if the screen size matches the specified parameters.

### Installation
~~~~
npm install --save @natenorrish/react-bounds
~~~~

### Usage
~~~~

import React, { Component } from 'react';
import Bounds from '@natenorrish/react-bounds'

class App extends Component
{
    render()
    {
        return (
            <Bounds 
                maxWidth="600"
                render={() => (
                    <div>Render this when screen is within 600px wide</div>
                )}
                else={() => (
                    <div>You can render for everything else using the else property</div>
                )}
            />
        );
    }
}


~~~~

### Create a custom component with parameters
~~~~
import React, { Component } from 'react';
import Bounds from '@natenorrish/react-bounds'
const Mobile = Bounds.create({ maxWidth: 600 });

class App extends Component
{
    render()
    {
        return (
            <Mobile
                render={() => <div>Render for mobile</div>}
                else={() => <div>Render for everything else</div>}
            />
        );
    }
}
~~~~

