#include <stdio.h>
#include <stdint.h>
int main()
{

	FILE *pointToMnist;
	FILE *pointToLabels;
	int i, j, k;

	uint8_t byte, labelbyte;
	pointToMnist = fopen("../../MNIST/train-images.idx3-ubyte","rb");
	pointToLabels = fopen("../../MNIST/train-labels.idx1-ubyte", "rb"); 


	//print the labels for the first 4 images to check
	for (i = 0; i <= 11; i++)
	{
		fread(&labelbyte, 1, 1, pointToLabels);
		printf("%02x \n", labelbyte);
	}

	//move the pointer to the first image
	for (i = 0; i <= 1; i++)
	{
		fread(&byte, 1, 1, pointToMnist);
	//	printf("%02x \n", byte);
	}

	//print the three images, using . and 0 characters from training Images
	for (k = 0; k <= 3; k++)
	{
		for (i = 0; i <= 28; i++)
		{
			for (j = 0; j <= 28; j++)
			{
				fread(&byte, 1, 1, pointToMnist);
				printf("%s", (byte > 127) ? "0" : ".");
			}
			printf("\n");
		}
		printf("\n");
	}

	getch();
	fclose(pointToMnist);
	fclose(pointToLabels);
	return 0;
}