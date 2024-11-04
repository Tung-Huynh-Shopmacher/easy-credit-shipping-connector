'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const logger_utils_1 = require('../utils/logger.utils');
const service_controller_1 = require('../controllers/service.controller');
const config_utils_1 = require('../utils/config.utils');
const serviceRouter = (0, express_1.Router)();
const config = (0, config_utils_1.readConfiguration)();
serviceRouter.post(
  '/',
  (req, res, next) => {
    if (req.headers.authorization !== `Bearer ${config.basicAuth}`) {
      logger_utils_1.logger.error('Unauthorized request', req);
      return res.status(401).send('Unauthorized');
    }
    next();
  },
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      logger_utils_1.logger.info('Service post message received');
      try {
        yield (0, service_controller_1.post)(req, res);
      } catch (error) {
        next(error);
      }
    })
);
exports.default = serviceRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvc2VydmljZS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFpQztBQUNqQyx3REFBK0M7QUFDL0MsMEVBQXlEO0FBQ3pELHdEQUEwRDtBQUUxRCxNQUFNLGFBQWEsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFBLGdDQUFpQixHQUFFLENBQUM7QUFFbkMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3pDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssVUFBVSxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztRQUMvRCxxQkFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDMUIscUJBQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUU3QyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEseUJBQUksRUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGtCQUFlLGFBQWEsQ0FBQyJ9
