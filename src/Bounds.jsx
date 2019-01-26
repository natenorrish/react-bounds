import React, { Component } from 'react';


window.addEventListener('resize', () => Bounds.instances.forEach(i => i.handleResize()));

class Bounds extends Component
{
	static profiles = {
		small: { maxWidth: 600 },
		medium: { minWidth: 800 },
		large: { minWidth: 1000 }
	};

	static instances = [];

	static create(params)
	{
		return (props) => <Bounds {...params}>{props.children}</Bounds>
	}

	constructor(props)
	{
		super(props);
		this.state = { display: this.shouldDisplay() };
	}

	componentDidMount()
	{
		Bounds.instances.push(this);
	}

	componentWillUnmount()
	{
		Bounds.instances.splice(Bounds.instances.indexOf(this), 1);
	}

	shouldDisplay()
	{
		const w = window.innerWidth;
		const h = window.innerHeight;
		const { minWidth, maxWidth, minHeight, maxHeight } = this.getParams();

		return !(
			(maxWidth !== undefined && w > maxWidth) ||
			(minWidth !== undefined && w < minWidth) || 
			(maxHeight !== undefined && h > maxHeight) ||
			(minHeight !== undefined && h < minHeight)
		);
	}

	render()
	{
		return this.state.display ? this.props.children : null;
	}

	handleResize = () => this.setState({ display: this.shouldDisplay() });

	getParams()
	{
		const profile = this.props.profile;

		if (profile) return this.getProfile(profile);
		if (this.props.small) return Bounds.profiles.small;
		if (this.props.medium) return Bounds.profiles.medium;

		if (this.props.from && this.props.to)
		{
			const f = this.getProfile(this.props.from);
			const t = this.getProfile(this.props.to);

			return {
				minWidth: f.minWidth || undefined,
				maxWidth: t.maxWidth || t.minWidth || undefined
			};
		}
		
		return Bounds.profiles.large;
	}

	getProfile(profile)
	{
		if (typeof(profile) === 'string')
			return Bounds.profiles[profile];
		else
			return profile;
	}

}

export default Bounds;
