from __future__ import with_statement
import contextlib

try:
    from urllib.parse import urlencode
except ImportError:
    from urllib import urlencode
try:
    from urllib.request import urlopen
except ImportError:
    from urllib import urlopen

import sys

def make_tiny(url):
    tiny_url = "http://tinyurl.com/api-create.php?"
    request_url = (tiny_url + urlencode({'url': url}))

    with contextlib.closing(urlopen(request_url)) as response:
        return response.read().decode('utf-8')


def main():

    for url in sys.argv[1:]:
        print(make_tiny(url))


if __name__ == '__main__':
    main()