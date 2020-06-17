try {
  // command
} catch(err) {
  logger.error(errorMsg);
} finally {
  // command after try or catch
  logger.info("end");
}
