'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.authMiddlewareOptions = void 0;
const config_utils_1 = require('../utils/config.utils');
/**
 * Configure Middleware. Example only. Adapt on your own
 */
exports.authMiddlewareOptions = {
  host: `https://auth.${(0, config_utils_1.readConfiguration)().region}.commercetools.com`,
  projectKey: (0, config_utils_1.readConfiguration)().projectKey,
  credentials: {
    clientId: (0, config_utils_1.readConfiguration)().clientId,
    clientSecret: (0, config_utils_1.readConfiguration)().clientSecret,
  },
  scopes: (0, config_utils_1.readConfiguration)().scope
    ? (0, config_utils_1.readConfiguration)().scope.split(' ')
    : undefined,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmUvYXV0aC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHdEQUEwRDtBQUMxRDs7R0FFRztBQUNVLFFBQUEscUJBQXFCLEdBQTBCO0lBQzFELElBQUksRUFBRSxnQkFBZ0IsSUFBQSxnQ0FBaUIsR0FBRSxDQUFDLE1BQU0sb0JBQW9CO0lBQ3BFLFVBQVUsRUFBRSxJQUFBLGdDQUFpQixHQUFFLENBQUMsVUFBVTtJQUMxQyxXQUFXLEVBQUU7UUFDWCxRQUFRLEVBQUUsSUFBQSxnQ0FBaUIsR0FBRSxDQUFDLFFBQVE7UUFDdEMsWUFBWSxFQUFFLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQyxZQUFZO0tBQy9DO0lBQ0QsTUFBTSxFQUFFLElBQUEsZ0NBQWlCLEdBQUUsQ0FBQyxLQUFLO1FBQy9CLENBQUMsQ0FBRSxJQUFBLGdDQUFpQixHQUFFLENBQUMsS0FBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxTQUFTO0NBQ2QsQ0FBQyJ9
