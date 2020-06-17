try {
  // command
  throw "custom message";
} catch(err) {
  logger.error(errorMsg);
} finally {
  // command after try or catch
  logger.info("end");
}
