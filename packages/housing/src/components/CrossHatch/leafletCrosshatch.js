import L from 'leaflet';
import '../../externals/leafletPattern';

/**
 * This builds a CrossHatch svg pattern generator and registers it with
 * Leaflet following the pattern from the leaflet.Pattern extension
 * @see https://github.com/teastman/Leaflet.pattern
 */
L.CrossHatch = L.Pattern.extend({

  /**
   * Default options for crosshatch pattern. Will be overriden by anything passed
   * to constructor
   */
  options: {
    weight: 0.5,
    color: 'white',
    opacity: 1.0,
    width: 10,
    height: 10,
  },

  /**
   * This method gets called when the pattern is added to a leaflet map instance
   */
  _addShapes() {
    /**
     * Left leaning stripe pattern
     */
    this._left = new L.PatternPath({
      stroke: true,
      weight: this.options.weight,
      color: this.options.color,
      opacity: this.options.opacity,
    });

    /**
     * Right leaning strip pattern
     */
    this._right = new L.PatternPath({
      stroke: true,
      weight: this.options.weight,
      color: this.options.color,
      opacity: this.options.opacity,
    });

    /**
     * Registers shapes with pattern instance
     */
    this.addShape(this._left);
    this.addShape(this._right);

    /**
     * Initially calls _update to set svg path based on options
     */
    this._update();
  },

  /**
   * this gets called internally somewhere, who knows. Draws two lines from corner to corner
   */
  _update() {
    this._left.options.d = `M0,0 l${this.options.width},${this.options.height}`;
    this._right.options.d = `M${this.options.width},0 l-${this.options.width},${this.options.height}`;
  },

  /**
   * Did this becuase the examples did it, not sure why it's needed
   */
  setStyle: L.Pattern.prototype.setStyle,
});
