import { StaticRendererBuilder } from './StaticRendererBuilder';
/**
 * A shorthand for create a new {@link static.StaticRendererBuilder StaticRendererBuilder} instance
 * @memberof static
 * @returns {Object} a new {@link static.StaticRendererBuilder StaticRendererBuilder} instance
 */
export const renderStatic = () => {
    return new StaticRendererBuilder();
}