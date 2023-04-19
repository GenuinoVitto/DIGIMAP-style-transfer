# Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.

import os

import numpy as np
import scipy.misc
from os.path import exists
from sys import stdout

from style_transfer import StyleTransfer

import math
from argparse import ArgumentParser

# default arguments
CONTENT_WEIGHT = 5e1
STYLE_WEIGHT = 1e2
TV_WEIGHT = 1e2
LEARNING_RATE = 1e1
ITERATIONS = 1000
VGG_PATH = 'imagenet-vgg-verydeep-19.mat'
CHECKPOINT_OUTPUT = 'output%%s.jpg'
CHECKPOINT_ITERATIONS = 10 #?

def load_image(image_path):
    assert exists(image_path), "image {} does not exist".format(image_path)
    img = imread(image_path)
    img = img.astype("float32")
    img = np.ndarray.reshape(img, (1,) + img.shape)
    return img

def mainStyleTransfer(content, style):
    """if not os.path.isfile(VGG_PATH):
        parser.error("Network %s does not exist." % VGG_PATH)"""

    content_image = load_image(content) # options.content
    style_image = load_image(style) # options.style

    initial = scipy.misc.imresize(imread(initial), content_image.shape[:2])

    device = '/gpu:0' 

    style_transfer = StyleTransfer(
        vgg_path=VGG_PATH,
        content=content_image,
        style=style_image,
        content_weight=CONTENT_WEIGHT,
        style_weight=STYLE_WEIGHT,
        tv_weight=TV_WEIGHT, # originally style_weight was assigned to this
        initial=initial,
        device=device)

    for iteration, image, losses in style_transfer.train(
        learning_rate=LEARNING_RATE,
        iterations=ITERATIONS,
        checkpoint_iterations=CHECKPOINT_ITERATIONS
    ):
        print_losses(losses)

        output_file = None
        if iteration is not None:
            if CHECKPOINT_OUTPUT:
                output_file = CHECKPOINT_OUTPUT % iteration
        else:
            output_file = "output.jpg"
        if output_file:
            imsave(output_file, image)


def print_losses(losses):
    stdout.write('  content loss: %g\n' % losses['content'])
    stdout.write('    style loss: %g\n' % losses['style'])
    stdout.write('       tv loss: %g\n' % losses['total_variation'])
    stdout.write('    total loss: %g\n' % losses['total'])

def imread(path):
    return scipy.misc.imread(path).astype(np.float)


def imsave(path, img):
    img = np.clip(img, 0, 255).astype(np.uint8)
    scipy.misc.imsave(path, img)
