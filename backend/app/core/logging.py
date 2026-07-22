import logging
import sys
from app.core.config import settings


def setup_logging() -> logging.Logger:
    """
    Configures and returns the central logger for Project Enigma.
    """
    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)
    
    # Custom log format
    log_format = "[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d]: %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"

    logging.basicConfig(
        level=log_level,
        format=log_format,
        datefmt=date_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

    logger = logging.getLogger("project_enigma")
    logger.setLevel(log_level)
    return logger


logger = setup_logging()
