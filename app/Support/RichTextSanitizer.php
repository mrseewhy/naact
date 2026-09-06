<?php

namespace App\Support;

use HTMLPurifier;
use HTMLPurifier_Config;

class RichTextSanitizer
{
    private HTMLPurifier $purifier;

    public function __construct()
    {
        $config = HTMLPurifier_Config::createDefault();
        $config->set('Core.Encoding', 'UTF-8');
        $config->set('HTML.Allowed', implode(',', [
            'p[class]', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
            'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'ol[class]', 'ul[class]', 'li[class]', 'span[class]',
            'a[href|title|target|rel]', 'img[src|alt|title|width|height]',
            'iframe[src|width|height|frameborder]',
        ]));
        $config->set('Attr.AllowedFrameTargets', ['_blank']);
        $config->set('HTML.SafeIframe', true);
        $config->set('URI.SafeIframeRegexp', '%^https://(www\.youtube(?:-nocookie)?\.com/embed/|player\.vimeo\.com/video/)%');

        $this->purifier = new HTMLPurifier($config);
    }

    public function sanitize(string $html): string
    {
        return $this->purifier->purify($html);
    }
}
